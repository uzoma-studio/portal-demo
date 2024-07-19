'use client'

import React from 'react'
import { StyledContainer } from './styles';

import Index from './pages';

const Layout = ({ pages }) => {

    return (
        <StyledContainer className='container'>
            <Index pages={pages} />
        </StyledContainer>
    )
}

export default Layout