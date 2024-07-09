'use client'

import React from 'react'
import { StyledContainer } from './styles';
import Page from './page'
import { findPage } from '../../utils/utils';

import RenderPages from '@/app/utils/RenderPages';

const Layout = ({ pages }) => {

    return (
        <StyledContainer className='container'>
            <RenderPages 
                pages={pages} 
                PagesComponent={Page} 
                getPagePosition={(pageConfig, pageDataId) => findPage(pageConfig, pageDataId).position} 
            />
        </StyledContainer>
    )
}

export default Layout