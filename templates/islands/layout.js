'use client'

import React, { useState, useEffect } from 'react'
import Page from './page'
import { StyledContainer } from './styles';
import { config } from './template-config';
import Island from './components/island';
import { findPage, renderCurrentPage } from '../../utils/utils';
import RenderPages from '@/app/utils/renderPages';

const Layout = ({ pages }) => {

    const [currentIsland, setCurrentIsland] = useState(null)

    useEffect(() => {
      setCurrentIsland(renderCurrentPage(pages))
    
      return () => {}
    }, [])

    return (
        <StyledContainer>
            {
                pages.map((pageData) => {

                    const pageImage = findPage(config.pageConfig, pageData.id).coverImage

                    return <RenderPages
                                key={pageData.id}
                                openPageViaLink={true}
                                pageSlug={pageData.slug}
                                setCurrentPage={setCurrentIsland}
                                currentPage={pageData}
                            >
                                <Island 
                                    pageData={{...pageData, pageImage}} 
                                    setCurrentIsland={setCurrentIsland}
                                />
                            </RenderPages>
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

