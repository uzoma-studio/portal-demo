'use client'

import React from 'react'
import { StyledContainer } from './styles';
import Page from './page'
import { config } from './template-config';
import { findPage } from '../../utils/utils';

const Layout = ({ pages }) => {

    const data = pages.data

    return (
        <StyledContainer className='container'>
            {
                data.map((page) => {
                    return <Page 
                                key={page.id}
                                pagePosition={findPage(config.pageConfig, page.id).position}
                                pageData={page.attributes} 
                            />
                    
                })
            }
        </StyledContainer>
    )
}

export default Layout