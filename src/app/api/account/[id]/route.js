import { getPayload } from 'payload'
import { NextResponse } from 'next/server'
import config from '@payload-config';

export async function GET(req, { params }) {
    try {
        const payload = await getPayload({ config })
        const { id } = await params

        const user = await payload.findByID({
            collection: 'users',
            id,
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        return NextResponse.json(user)
    } catch (error) {
        console.error('Error fetching user:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PATCH(req, { params }) {
    try {
        const payload = await getPayload({ config })
        const { id } = await params
        const body = await req.json()

        const user = await payload.update({
            collection: 'users',
            id,
            data: body,
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        return NextResponse.json(user)
    } catch (error) {
        console.error('Error updating user:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
} 