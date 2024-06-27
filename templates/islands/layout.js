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

