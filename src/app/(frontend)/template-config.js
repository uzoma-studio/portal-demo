/**
 * Global config file to be used across templates
 */

export const globalConfig = {
    style: {
        backgroundColor: '#fff',
        bodyTextColor: '#222',
        headerFont: 'Helvetica',
        headerFontColor: '#222',
        bodyFont: 'Courier New',
        contentTextColor: '#222',
        // TODO: add more parameters
    },
    // Manually map page ids from Payload backend to config
    pageConfig: [
        {
            id: 1,
            slug: 'sample-page',
            position: {x: 35, y: 20}
        },
        {
            id: 2,
            slug: 'chat-page',
            position: {x: 50, y: 25}
        },
        {
            id: 3,
            slug: 'messages',
            position: {x: 20, y: 75}
        },
        {
            id: 4,
            slug: 'shop',
            position: {x: 40, y: 60}
        },
    ]
}