'use client'

import React, { useState } from 'react'
import Page from './page'
import { StyledContainer } from './styles';
import { config } from './template-config';
import Island from './components/island';
import { findPage } from '../../utils/utils';

const Layout = ({ pages }) => {

    const data = pages.data

    const [currentIsland, setCurrentIsland] = useState(null)

    return (
        <StyledContainer>
            {
                data.map((islandData, index) => {

                    const pageImage = findPage(config.pageConfig, islandData.id).coverImage

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

