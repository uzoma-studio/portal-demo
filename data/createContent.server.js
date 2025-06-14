'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

// TODO:  Set authorisation so that only space owner can use these functions

export const createEntry = async (pageType, data) => {
    try {
        const entry = await payload.create({
            collection: pageType, // required
            data, 
        }) 
        return entry
    } catch (error) {
        console.error('Error creating page:', error)
        return null
    }
}

export const updatePage = async (pageId, pageData) => {    
    try {
        const page = await payload.update({
            collection: 'pages',
            where: {
                id: {
                    equals: pageId
                }
            },
            data: pageData,
        })
        return page.docs[0]
    } catch (error) {
        console.error('Error updating page:', error)
        return null
    }
}