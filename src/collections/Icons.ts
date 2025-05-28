import { CollectionConfig } from 'payload'

export const Icons: CollectionConfig = {
    slug: 'icons',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'icon', 'createdAt'],
        group: 'Content',
    },
    access: {
        read: () => true,
    },
    upload: {
        staticDir: 'public/icons',
        mimeTypes: ['image/svg+xml', 'image/png'],
        imageSizes: [
            {
                name: 'thumbnail',
                width: 48,
                height: 48,
                position: 'centre',
            },
        ],
        adminThumbnail: ({ doc }: { doc: { mimeType: string; url: string } }) => {
            if (doc.mimeType === 'image/svg+xml') {
                return doc.url
            }
            return 'thumbnail'
        },
        formatOptions: {
            format: 'webp',
            options: {
                effort: 6,
            },
        },
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            admin: {
                description: 'A descriptive name for the icon',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            admin: {
                description: 'Optional description of the icon\'s purpose or usage',
            },
        },
        {
            name: 'tags',
            type: 'array',
            admin: {
                description: 'Add tags to help categorize and find icons',
            },
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                },
            ],
        },
    ],
}

export default Icons 