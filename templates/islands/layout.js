import React from 'react'
import './style.scss'
import { config } from './template-config'

// this can actually be safely turned into a client component bc the data fetching has already been done?

const Layout = ({ pages }) => {

    const islands = pages.data

    /**
     * Get the correct island image for the page from pageConfig in the template config file
     * @param {String} pageId  - the id of the page
     * @returns {String} The URL of the page image
     */
    const findImageByPage = (pageId) => {
        return config.pageConfig.find(({ id }) => id === pageId).coverImage
    }

    return (
        <div className='islands-container'
            style={{ background: config.backgroundColor }}
        >
            {
                islands.map((island) => {

                    const pageImage = findImageByPage(island.id)

                    return <div
                        className='single-island-container'
                        style={{
                            left: `${pageImage.position.x}%`,
                            top: `${pageImage.position.y}%`
                        }}
                    >
                        <img
                            key={island.id}
                            src={pageImage.url}
                            alt=''
                            className='island'
                        // onClick={() => setCurrentIsland(islandsData[index])}
                        />
                        <p className='title'>{island.attributes.Title}</p>
                    </div>
                })
            }
        </div>
    )
}

export default Layout

