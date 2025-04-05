/**
 * Template config file. Use to set styling and details for site templates
 * 
 * @type {Object} style - for setting style attributes for template files (used in styles.js)
 * @type {Array} pageConfig - for mapping template designs to site pages
 */

import { globalConfig } from "@/app/(frontend)/template-config"

const config = {
    style: {
        ...globalConfig.style,
        backgroundColor: '#fff'
    },
    pageConfig: globalConfig.pageConfig
}

export { config }