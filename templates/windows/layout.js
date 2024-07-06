'use client'

import React from 'react'
import { StyledContainer } from './styles';
import Page from './page'
import { config } from './template-config';
import { findPage } from '../../utils/utils';

const Layout = ({ pages }) => {

    return (
        <StyledContainer className='container'>
            {
                pages.map((pageData) => {
                    return <Page 
                                key={pageData.id}
                                pagePosition={findPage(config.pageConfig, pageData.id).position}
                                pageData={pageData} 
                            />
                    
                })
            }
        </StyledContainer>
    )
}

export default Layout