'use client'

import React from 'react'
import { StyledContainer } from './styles';
import Page from './page'
import { findPage } from '../../utils/utils';
import { config } from './template-config';

import RenderPages from '@/app/utils/renderPages';

const Layout = ({ pages }) => {

    return (
        <StyledContainer className='container'>
            {
                pages.map((pageData) => 
                    <RenderPages>
                        <Page
                            key={pageData.id}
                            pageData={pageData}
                            pagePosition={findPage(config.pageConfig, pageData.id).position}
                        />
                    </RenderPages>
                )
            }
        </StyledContainer>
    )
}

export default Layout