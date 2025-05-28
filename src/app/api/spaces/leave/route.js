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

        // Find the membership
        const membership = await payload.find({
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

        if (membership.totalDocs === 0) {
            return NextResponse.json({ error: 'Not a member of this space' }, { status: 400 });
        }

        // Delete the membership
        await payload.delete({
            collection: 'spaceMemberships',
            id: membership.docs[0].id,
        });

        // Remove space from user's spaces array
        await payload.update({
            collection: 'users',
            id: user.id,
            data: {
                spaces: (user.spaces || []).filter(id => id !== spaceId),
            },
        });

        return NextResponse.json({ message: 'Successfully left space' });
    } catch (error) {
        console.error('Error leaving space:', error);
        return NextResponse.json({ error: 'Failed to leave space' }, { status: 500 });
    }
} 