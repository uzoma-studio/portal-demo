const headers = {
    "Authorization": `bearer ${process.env.STRAPI_ACCESS_TOKEN}`
}

const getData = async (endpoint) => {
    const response = await fetch(`${process.env.STRAPI_URL}/api/${endpoint}?populate=*`, {headers})
    const data = await response.json()
    
    return data
}

export { getData }