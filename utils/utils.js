/**
 * Get a page's data by id from pageConfig in a template's config file
 * @param {Object} pageConfig  - the page config obj from template-config.js
 * @param {String} pageId  - the id of the page
 * @returns {String} The URL of the page image
 */
export const findPage = (pageConfig, pageId) => {
    return pageConfig.find(({ id }) => id === pageId)
}

