const headers = {
    "Authorization": `bearer ${process.env.STRAPI_ACCESS_TOKEN}`,
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    "Pragma": "no-cache",
    "Expires": "0"
}

const getData = async (endpoint) => {
    const response = await fetch(`${process.env.STRAPI_URL}/api/${endpoint}?populate=*`, {
        headers,
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

// Abstract data from the CMS into a middle layer object that template files can use
// This is necessary because template files should not be interacting with CMS directly
// If the CMS schema changes for any reason, this one method can be edited instead of having to edit various template files
const dataMapper = (data) => {
    const dataMap = []

    data.forEach(({id, attributes: { Title, Body, Slug, Content }}) => 
        dataMap.push({
            id,
            title: Title,
            body: Body,
            slug: Slug,
            contentType: Content
        })
    );
    
    return dataMap
}

export { getData, dataMapper }