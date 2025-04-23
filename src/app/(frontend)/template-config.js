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
            pageTitle: 'Updates',
            slug: 'sample-page',
            position: {x: 28.5, y: 25}
        },
        {
            id: 2,
            pageTitle: 'Chatbot',
            slug: 'chat-page',
            position: {x: 61.5, y: 15}
        },
        {
            id: 3,
            pageTitle: 'Messages',
            slug: 'messages',
            position: {x: 10, y: 58.5}
        },
        {
            id: 4,
            pageTitle: 'Shop',
            slug: 'shop',
            position: {x: 91.5, y: 25}
        },
    ]
}