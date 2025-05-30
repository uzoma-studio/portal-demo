import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config'

export async function POST(req) {
  try {
    const payload = await getPayload({ config });
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await payload.login({
      collection: 'users',
      data: { email, password },
    });

    const response = NextResponse.json({ message: 'Logged in', user: user.user });
    
    // Get the domain from the request
    const host = req.headers.get('host');
    const domain = process.env.NODE_ENV === 'production' 
      ? '.portal8.space'  // Production domain
      : '.localhost';     // Development domain

    response.cookies.set('payload-token', user.token, {
      httpOnly: true, // Prevents access from JavaScript
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax',
      path: '/',
      domain: domain, // Set the domain to work across subdomains
    });

    return response
    
  } catch (error) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}