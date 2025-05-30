import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config'

export async function POST(req) {
  try {
    const payload = await getPayload({ config });
    const { email, password, username } = await req.json();

    if (!email || !password || !username) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const user = await payload.create({
      collection: 'users',
      data: { email, password, username },
    });

    const response = NextResponse.json({ message: 'Signed up successfully', user });

    // Get the domain from the request
    const host = req.headers.get('host');
    const domain = process.env.NODE_ENV === 'production' 
      ? '.portal8.space'  // Production domain
      : '.localhost';     // Development domain

    response.cookies.set('payload-token', user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      domain: domain, // Set the domain to work across subdomains
    });
  
    return response

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}