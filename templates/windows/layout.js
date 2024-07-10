'use client'

import React from 'react'
import { StyledContainer } from './styles';
import Page from './page'
import { findPage } from '../../utils/utils';
import { config } from './template-config';

import RenderPage from '@/app/utils/RenderPage';

const Layout = ({ pages }) => {

    return (
        <StyledContainer className='container'>
            {
                pages.map((pageData) => 
                    <RenderPage>
                        <Page
                            key={pageData.id}
                            pageData={pageData}
                            pagePosition={findPage(config.pageConfig, pageData.id).position}
                        />
                    </RenderPage>
                )
            }
        </StyledContainer>
    )
}

export default Layout