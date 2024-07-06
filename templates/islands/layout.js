'use client'

import React, { useState } from 'react'
import Page from './page'
import { StyledContainer } from './styles';
import { config } from './template-config';
import Island from './components/island';
import { findPage } from '../../utils/utils';

const Layout = ({ pages }) => {

    const [currentIsland, setCurrentIsland] = useState(null)

    return (
        <StyledContainer>
            {
                pages.map((pageData) => {

                    const pageImage = findPage(config.pageConfig, pageData.id).coverImage

                    return <Island 
                                key={pageData.id}
                                pageData={{...pageData, pageImage}} 
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

