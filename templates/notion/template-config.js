/**
 * Template config file. Use to set styling and details for site templates
 * 
 * @type {Object} style - for setting style attributes for template files (used in styles.js)
 * @type {Array} pageConfig - for mapping template designs to site pages
 */

const config = {
    style: {
        backgroundColor: '#fff',
        bodyTextColor: '#222',
        headerFont: 'Helvetica',
        headerFontColor: '#222',
        bodyFont: 'Courier New',
    },
    pageConfig: [
        {
            id: 1, 
            pageSlug: 'lorem-ipsum',
            headerImage: "/assets/islands/island-4.png"
        },
        {
            id: 2, 
            pageSlug: 'id-diam-maecenas',
        },
        {
            id: 3, 
            pageSlug: 'urna-condimentum',
        },
        {
            id: 4, 
            pageSlug: 'vulputate-sapien',
            headerImage: "/assets/islands/island-2.png"
        }
    ]
}

export { config }