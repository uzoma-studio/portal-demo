'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export const createPage = async (pageData) => {
    try {
        const page = await payload.create({
            collection: 'pages', // required
            data: pageData, 
        }) 
    } catch (error) {
        console.error('Error creating page:', error)
        return null
    }
}