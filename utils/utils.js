/**
 * Get a page's data by id from pageConfig in a template's config file
 * @param {Object} pageConfig  - the page config obj from template-config.js
 * @param {String} pageId  - the id of the page
 * @returns {String} The URL of the page image
 */
export const findPage = (pageConfig, pageId) => {
    return pageConfig.find(({ id }) => id === pageId)
}

/**
 * Finds and returns the current page based on the URL hash.
 *
 * This function extracts the slug from the current URL's hash,
 * then searches through the provided pages array to find a page
 * with a matching slug. If the pathname is '/' or no matching
 * page is found, it returns null.
 *
 * @param {Array} pages - An array of page objects where each object contains a 'slug' property.
 * @returns {Object|null} - The matched page object or null if no match is found or pathname is '/'.
 */
export const renderCurrentPage = (pages) => {
    // Split the URL hash by '#' and take the second part to get the pathname
    const pathname = window.location.hash.split('#')[1]
    // Find the page object that matches the pathname in the pages array
    const page = pages.find(({ slug }) => slug === pathname)

    // If the pathname is '/' or no matching page is found, return null
    if (pathname === '/' || !page) {
        return null
    } else {
        // Otherwise, return the matched page object
        return page
    }
}

export const getCoverImageUrl = (coverImage) => {
    return coverImage ? `${process.env.STRAPI_URL}${coverImage.data.attributes.url}` : null

}