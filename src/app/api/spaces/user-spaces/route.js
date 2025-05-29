import { getPayload } from 'payload';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import config from '@payload-config';


export async function GET(req) {
    try {
        const payload = await getPayload({ config });
        const headersList = await headers();
        
        const { user } = await payload.auth({ headers: headersList });
        
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get all spaces where the user is a member
        const spaces = await payload.find({
            collection: 'spaceMemberships',
            where: {
                user: {
                    equals: user.id
                },
                status: {
                    equals: 'active'
                }
            },
            depth: 1, // Include the space details
        });

        // Transform the data to include space details and role
        const userSpaces = spaces.docs.map(membership => ({
            id: membership.space.id,
            name: membership.space.name,
            role: membership.role,
        }));

        return NextResponse.json({ spaces: userSpaces });
    } catch (error) {
        console.error('Error fetching user spaces:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 