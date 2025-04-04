'use client'

import React, { useState, useEffect, useContext } from 'react'
import { StyledContainer } from './styles';
import { renderCurrentPage } from '../../utils/utils';

import Index from './layout/index'
import SinglePage from './layout/single'
import { AppContext } from '../../context'

const Page = ({ pages }) => {

    const [currentPage, setCurrentPage] = useState(null)


    // Get site metadata from React Context
    const context = useContext(AppContext)
    const { siteTitle, siteDescription } = context || {}

    useEffect(() => {
        setCurrentPage(renderCurrentPage(pages))
      
        return () => {}
    }, [])

    return (
        <StyledContainer>
            {
                !currentPage ?
                    <>
                        <h1 style={{fontSize: '6rem', marginBottom: '2rem'}}>{siteTitle ? siteTitle : 'Portal Starter'}</h1>
                        {siteDescription && <p>{siteDescription}</p> }
                        <Index pages={pages} setCurrentPage={setCurrentPage} />
                    </>
                    :
                    <SinglePage page={currentPage} setCurrentPage={setCurrentPage} />
            }
        </StyledContainer>
    )
}

export default Page