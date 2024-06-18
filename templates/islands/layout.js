'use client'

import React, { useState } from 'react'
import Page from './page'
import { StyledContainer, StyledSingleIslandContainer } from './styles';
import { config } from './template-config';

const Layout = ({ pages }) => {

    const islands = pages.data

    const [currentIsland, setCurrentIsland] = useState(null)

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
        <StyledContainer>
            {
                islands.map((island, index) => {

                    const pageImage = findImageByPage(island.id)

                    // TODO: Make each Island a re-usable component that can be used across templates if so desired
                    return <StyledSingleIslandContainer
                                $image={pageImage}
                                key={island.id}
                            >
                                <img
                                    key={island.id}
                                    src={pageImage.url}
                                    alt=''
                                    onClick={() => setCurrentIsland(islands[index])}
                                />
                                <p>{island.attributes.Title}</p>
                            </StyledSingleIslandContainer>
                })
            }
            {
                currentIsland &&
                    <Page 
                        currentIsland={currentIsland} 
                        setCurrentIsland={setCurrentIsland}
                    />
            }
        </StyledContainer>
    )
}

export default Layout

