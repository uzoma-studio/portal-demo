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
        // you can add template-specific config
    },
    pageConfig: [
        {
            id: 1, 
            pageSlug: '',
            // you can add more config per page
        },
        // ...
    ]
}

export { config }