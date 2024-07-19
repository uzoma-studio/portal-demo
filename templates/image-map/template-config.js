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
        hotspotColor: 'crimson',
        hotspotSize: '15',
        pageStyles: {
            width: '500px',
            height: '500px',
            backgroundColor: '#fff',
            borderColor: 'crimson',
            borderWidth: '3px'
        }
    },
    pageConfig: [
        {
            id: 1, 
            pageSlug: 'lorem-ipsum',
            position: {x: 35, y: 20}
        },
        {
            id: 2, 
            pageSlug: 'matnuis-calendrum',
            position: {x: 85, y: 25}
        },
        {
            id: 3, 
            pageSlug: 'maecenas',
            position: {x: 62.5, y: 60}
        },
        {
            id: 4, 
            pageSlug: 'nulla-facilisi',
            position: {x: 20, y: 20}
        }
    ]
}

export { config }