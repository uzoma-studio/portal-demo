'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'

const payload = await getPayload({ config })

const getCurrentSpace = async () => {
    try {
        const headersList = await headers()
        const hostname = headersList.get('host').split('.')[0] || ''
        
        const space = await payload.find({
            collection: 'spaces',
            where: {
                domain: {
                    equals: hostname
                }
            }
        })

        if (space.docs.length > 0) {
            return space.docs[0]
        }
        
        return null
    } catch (error) {
        console.error('Error fetching space:', error)
        return null
    }
}

const fetchPages = async (spaceId) => {
    const result = await payload.find({
        collection: 'pages',
        where: {
            space: {
                equals: spaceId
            }
        }
    })
    return result
}

const getContent = async (type, spaceId, sortFn='-createdAt', limit=10) => {
    const result = await payload.find({
        collection: type,
        sort: sortFn,
        limit,
        where: {
            space: {
                equals: spaceId
            }
        }
    })
    return result
}

const getSiteSettings = async () => {
    return await payload.find({
        collection: 'siteSettings'
    })

    return settings[0]
}

const getPostsByUpdate = async(updateId) => {
    const results = await payload.find({
        collection: 'posts',
        where: {
            update: {
                equals: updateId,
            },
        },
        sort: '-date',
    });

    return results;
}

export { getCurrentSpace, fetchPages, getContent, getSiteSettings, getPostsByUpdate }