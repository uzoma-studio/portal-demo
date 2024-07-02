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

export { getData }