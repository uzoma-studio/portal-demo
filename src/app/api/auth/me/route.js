import { NextResponse } from 'next/server';
import { headers as nextHeaders } from 'next/headers';
import { getPayload } from 'payload';
import config from '@payload-config'

export async function GET(req) {
    try {
        const headers = await nextHeaders()

        const payload = await getPayload({ config });
        const { user } = await payload.auth({ headers });

        if (user) {
            return NextResponse.json({ user });
        } else {
            return NextResponse.json({ user: null }, { status: 200 });
        }

    } catch (error) {
        console.error('Authentication error:', error);
        return NextResponse.json({ error: 'Could not authenticate user' }, { status: 400 });
    }
}