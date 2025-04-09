import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config'

export async function GET() {
  const payload = await getPayload();
  const { docs } = await payload.find({
    collection: 'chat-messages',
    sort: '-timestamp',
    limit: 50, // Limit messages
  });

  return NextResponse.json(docs);
}

export async function POST(req) {
  const payload = await getPayload({ config });
  const { user, message } = await req.json();

  if (!user || !message) {
    return NextResponse.json({ error: 'User and message are required' }, { status: 400 });
  }

  const newMessage = await payload.create({
    collection: 'chat-messages',
    data: { user, message },
  });

  console.log(NextResponse.json(newMessage));
  return NextResponse.json(newMessage);
}