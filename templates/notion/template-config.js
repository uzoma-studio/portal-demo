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
        headerImage: 'url(/assets/planets/universe.jpeg)'
    },
    pageConfig: [
        {
            id: 1, 
            pageSlug: 'lorem-ipsum', 
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
        }
    ]
}

export { config }