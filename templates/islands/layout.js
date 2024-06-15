'use client'

import React, { useState } from 'react'
import './style.scss'
import { config } from './template-config'

import Page from './page'

// this can actually be safely turned into a client component bc the data fetching has already been done?

const Layout = ({ pages }) => {

    const islands = pages.data

    const [currentIsland, setCurrentIsland] = useState(null)
    
    // General theme styling, gotten from template config file
    const { style } = config
    const themeStyles = {
        background: style.backgroundColor,
        color: style.bodyTextColor,
    }

    // TODO: Write a javascript function that maps style attributes in template config file to css class names
    
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
            style={themeStyles}
        >
            {
                islands.map((island, index) => {

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
                        onClick={() => setCurrentIsland(islands[index])}
                        />
                        <p className='title'>{island.attributes.Title}</p>
                    </div>
                })
            }
            {
                currentIsland &&
                    <Page 
                        currentIsland={currentIsland} 
                        setCurrentIsland={setCurrentIsland}
                        style={style}
                    />
            }
        </div>
    )
}

export default Layout

