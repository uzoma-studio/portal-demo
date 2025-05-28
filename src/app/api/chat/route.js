import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload();
    const { docs } = await payload.find({
      collection: 'chat-messages',
      sort: '-timestamp',
      limit: 50, // Limit messages
    });

    return NextResponse.json(docs);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return NextResponse.json({ error: 'Failed to fetch chat messages' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const payload = await getPayload({ config });
    const { user, message, space } = await req.json();

    if (!user || !message) {
      return NextResponse.json({ error: 'User and message are required' }, { status: 400 });
    }

    const newMessage = await payload.create({
      collection: 'chat-messages',
      data: { user, message, space },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error('Error creating chat message:', error);
    return NextResponse.json({ error: 'Failed to create chat message' }, { status: 500 });
  }
}