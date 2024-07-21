'use client'

import React, { useState, useEffect } from 'react'
import { StyledContainer } from './styles';
import { renderCurrentPage } from '../../utils/utils';

import Index from './layout/index'
import SinglePage from './layout/single'

const Page = ({ pages }) => {

    const [currentPage, setCurrentPage] = useState(null)

    useEffect(() => {
        setCurrentPage(renderCurrentPage(pages))
      
        return () => {}
    }, [])

    return (
        <StyledContainer>
            {
                !currentPage ?
                    <>
                        <h1 style={{fontSize: '6rem', marginBottom: '2rem'}}>Portal Starter</h1>
                        <Index pages={pages} setCurrentPage={setCurrentPage} />
                    </>
                    :
                    <SinglePage page={currentPage} setCurrentPage={setCurrentPage} />
            }
        </StyledContainer>
    )
}

export default Page