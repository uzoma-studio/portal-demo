/**
 * Template config file. Use to set styling and details for site templates
 * 
 * @type {Object} style - for setting style attributes for template files (used in styles.js)
 * @type {Array} pageConfig - for mapping template designs to site pages
 */

import { globalConfig } from "@/app/(frontend)/template-config"

const config = {
    templateImage: {
        url: '/assets/image-map/kiefer.png',
        alt: 'Image of Kiefers Room'
    },
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
    pageConfig: globalConfig.pageConfig
}

export { config }