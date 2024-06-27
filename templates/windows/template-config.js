/**
 * Template config file. Use to set styling and details for site templates
 * 
 * @type {Object} style - for setting style attributes for template files (used in styles.js)
 * @type {Array} pageConfig - for mapping template designs to site pages
 */

const config = {
    style: {
        backgroundColor: '#0018f9',
        textColor: '#222',
        headerFont: 'Helvetica',
        bodyFont: 'Courier New',
        borderSize: '4px',
        borderColor: 'grey',
    },
    pageConfig: [
        {
            id: 1, 
            pageSlug: 'lorem-ipsum', 
            position: {x: 5, y: 10},
        },
        {
            id: 2, 
            pageSlug: 'sodales-neque-sodales', 
            position: {x: 30, y: 55},
        },
        {
            id: 3, 
            pageSlug: 'purus-in-massa', 
            position: {x: 70, y: 5},
        },
        {
            id: 4, 
            pageSlug: 'mattis-rhoncus-urna', 
            position: {x: 60, y: 30},
        }
    ]
}

export { config }