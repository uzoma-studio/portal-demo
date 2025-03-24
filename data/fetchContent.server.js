'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const fetchPages = async () => {
    const result = await payload.find({
        collection: 'pages', // required
    })
    return result
}

const getSiteSettings = async () => {
    const result = await payload.find({
        collection: 'siteSettings', // required
    })
    return result
}

export { fetchPages, getSiteSettings }