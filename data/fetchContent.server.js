'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const fetchPages = async () => {
    const result = await payload.find({
        collection: 'pages',
    })
    return result
}

const getSiteSettings = async () => {
    const result = await payload.find({
        collection: 'siteSettings',
    })
    return result
}

const getContent = async (type) => {
    const result = await payload.find({
        collection: type,
        sort: '-createdAt',
    })
    return result
}

export { fetchPages, getSiteSettings, getContent }