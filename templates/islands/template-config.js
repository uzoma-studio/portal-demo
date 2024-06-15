const config = {
    backgroundColor: '#2980b9',
    bodyTextColor: '#222',
    headerFont: 'Helvetica',
    bodyFont: 'Courier New',
    pageConfig: [
        {
            id: 1, 
            pageSlug: 'lorem-ipsum', 
            coverImage: {
                url: "/assets/islands/island-1.png", 
                position: {x: 5, y: 10}
            }
        },
        {
            id: 2, 
            pageSlug: 'sodales-neque-sodales', 
            coverImage: {
                url: "/assets/islands/island-2.png", 
                position: {x: 90, y: 15}
            }
        },
        {
            id: 3, 
            pageSlug: 'purus-in-massa', 
            coverImage: {
                url: "/assets/islands/island-3.png", 
                position: {x: 20, y: 75}
            }
        },
        {
            id: 4, 
            pageSlug: 'mattis-rhoncus-urna', 
            coverImage: {
                url: "/assets/islands/island-4.png", 
                position: {x: 100, y: 80}
            }
        }
    ]
}

export { config }