import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { headers } from 'next/headers';

export async function POST(req) {
    try {
        const payload = await getPayload({ config });
        const { spaceId } = await req.json();

        // Get the current user from the session
        const { user } = await payload.auth({ headers: headers() });
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if the space exists
        const space = await payload.findByID({
            collection: 'spaces',
            id: spaceId,
        });

        if (!space) {
            return NextResponse.json({ error: 'Space not found' }, { status: 404 });
        }

        // Check if user is already a member
        const existingMembership = await payload.find({
            collection: 'spaceMemberships',
            where: {
                user: {
                    equals: user.id,
                },
                space: {
                    equals: spaceId,
                },
            },
        });

        if (existingMembership.totalDocs > 0) {
            return NextResponse.json({ error: 'Already a member of this space' }, { status: 400 });
        }

        // Create new membership
        const membership = await payload.create({
            collection: 'spaceMemberships',
            data: {
                user: user.id,
                space: spaceId,
                role: 'member',
                status: 'active',
                joinedAt: new Date().toISOString(),
            },
        });

        // Add space to user's spaces array
        await payload.update({
            collection: 'users',
            id: user.id,
            data: {
                spaces: [...(user.spaces || []), spaceId],
            },
        });

        return NextResponse.json({ message: 'Successfully joined space', membership });
    } catch (error) {
        console.error('Error joining space:', error);
        return NextResponse.json({ error: 'Failed to join space' }, { status: 500 });
    }
} 