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

const getThemeSettings = async () => {
    const result = await payload.find({
        collection: 'themeSettings',
    })
    return result
}

const getContent = async (type, sortFn='-createdAt', limit=10) => {
    const result = await payload.find({
        collection: type,
        sort: sortFn,
        limit
    })
    return result
}

export { fetchPages, getSiteSettings, getThemeSettings, getContent }