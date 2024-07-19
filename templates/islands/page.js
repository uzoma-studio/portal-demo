'use client'

import React, { useState, useEffect } from 'react'
import { StyledContainer } from './styles';
import { renderCurrentPage } from '../../utils/utils';

import Index from './layout/index'
import SinglePage from './layout/single'

const Layout = ({ pages }) => {

    const [currentPage, setCurrentPage] = useState(null)

    useEffect(() => {
      setCurrentPage(renderCurrentPage(pages))
    
      return () => {}
    }, [])

    return (
        <StyledContainer>
            <Index pages={pages} setCurrentPage={setCurrentPage} />
            {
                currentPage &&
                    <SinglePage
                        currentPage={currentPage} 
                        setCurrentPage={setCurrentPage}
                    />
            }
        </StyledContainer>
    )
}

export default Layout

