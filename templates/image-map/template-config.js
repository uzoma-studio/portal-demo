/**
 * Template config file. Use to set styling and details for site templates
 * 
 * @type {Object} style - for setting style attributes for template files (used in styles.js)
 * @type {Array} pageConfig - for mapping template designs to site pages
 */

import { globalConfig } from "@/app/(frontend)/template-config"

const config = {
    templateImage: {
        url: '/assets/image-map/space.png',
        alt: 'Composition of my living room'
    },
    style: {
        ...globalConfig.style,
        hotspotColor: 'purple',
        hotspotSize: '15',
        pageStyles: {
            width: '50%',
            height: '70vh',
            backgroundColor: '#fff',
            borderColor: 'purple',
            borderWidth: '3px'
        }
    },
    pageConfig: globalConfig.pageConfig
}

export { config }