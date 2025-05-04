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
        // TODO: Scrap this object since it is now being created and gotten from the CMS
    },
    // Manually map page ids from Payload backend to config
    // TODO: Note that this is irrelevant and not being used in rendering the pages (at least in imagemap template), the data is now being fetched from the CMS
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