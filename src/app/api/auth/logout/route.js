import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config'

export async function GET() {
    try {
        const response = NextResponse.json({ message: 'Logged out successfully' });

        response.cookies.set('payload-token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            expires: new Date(0),
        });

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
    }
}