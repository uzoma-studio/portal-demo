'use client'

import React from 'react'
import { StyledContainer } from './styles';
import Page from './page'
import { config } from './template-config';

const Layout = ({ pages }) => {

    const data = pages.data
    
    const getPageConfig = (pageId) => {
        return config.pageConfig.find(({ id }) => id === pageId)
    }

    return (
        <StyledContainer className='container'>
            {
                data.map((page) => {
                    return <Page 
                                key={page.id}
                                pagePosition={getPageConfig(page.id).position}
                                pageData={page.attributes} 
                            />
                    
                })
            }
        </StyledContainer>
    )
}

export default Layout