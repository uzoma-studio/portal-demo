'use client'

import React, { useState } from 'react'
import Page from './page'
import { StyledContainer } from './styles';
import { config } from './template-config';
import Island from './components/island';

const Layout = ({ pages }) => {

    const data = pages.data

    const [currentIsland, setCurrentIsland] = useState(null)
    
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
                data.map((islandData, index) => {

                    const pageImage = findImageByPage(islandData.id)

                    // TODO: Make each Island a re-usable component that can be used across templates if so desired
                    return <Island 
                                key={islandData.id}
                                data={islandData} 
                                image={pageImage}
                                setCurrentIsland={setCurrentIsland}
                            />
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

