import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config'

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY;

export async function POST(req) {
    try {
        const payload = await getPayload({ config });
        const { userId, productId, userEmail } = await req.json();

        // Fetch product from Payload
        const product = await payload.findByID({
            collection: 'products',
            id: productId,
        });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Determine if it's a one-time or subscription payment
        const isSubscription = product.paymentType === 'subscription';
        const paystackUrl = isSubscription
            ? 'https://api.paystack.co/subscription'
            : 'https://api.paystack.co/transaction/initialize';

        // Prepare payment request
        const paymentData = {
            email: userEmail,
            amount: product.price * 100, //kobo to naira
            currency: 'NGN',
            reference: `portal-${Date.now()}`,
            callback_url: 'https://your-portal.com/payment-success',
            ...(isSubscription && { plan: product.paystackPlanId }), // Attach subscription plan if applicable
        };

        // Make request to Paystack
        const response = await fetch(paystackUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        const data = await response.json();
        if (!data.status) throw new Error(data.message);

        return NextResponse.json({ paymentUrl: data.data.authorization_url });
    } catch (error) {
        console.error('Payment error:', error);
        return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
    }
}