/**
 * Template config file. Use to set styling and details for site templates
 * 
 * @type {Object} style - for setting style attributes for template files (used in styles.js)
 * @type {Array} pageConfig - for mapping template designs to site pages
 */

import { globalConfig } from "@/app/template-config"

const config = {
    style: {
        ...globalConfig.style,
        backgroundColor: '#fff'
    },
    pageConfig: [
        {
            id: 1, 
            pageSlug: 'lorem-ipsum',
            headerImage: "/assets/islands/island-4.png"
        },
        {
            id: 2, 
            pageSlug: 'matnuis-calendrum',
        },
        {
            id: 3, 
            pageSlug: 'maecenas',
        },
        {
            id: 4, 
            pageSlug: 'nulla-facilisi',
            headerImage: "/assets/islands/island-2.png"
        }
    ]
}

export { config }