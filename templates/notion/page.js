'use client'

import React, { useState, useEffect, useContext } from 'react'
import { StyledContainer } from './style'
import { renderCurrentPage } from '../../utils/utils'

// Import root components
import HeroSection from '@/app/(frontend)/components/HeroSection'
import Footer from '@/app/(frontend)/components/Footer'

import Index from './layout/index'
import SinglePage from './layout/single'
import { AppContext } from '../../context'

const Layout = ({ pages }) => {

    // Get site metadata from React Context
    const context = useContext(AppContext)
    const siteSettings = context.site
    const { siteTitle, siteDescription } = siteSettings

    const [currentPage, setCurrentPage] = useState(null)

    useEffect(() => {
        setCurrentPage(renderCurrentPage(pages))
      
        return () => {}
      }, [])
    
    return (
        <StyledContainer>
            <HeroSection image={'url(/assets/planets/universe.jpeg)'} height='50vh'>
                <h1 style={{color: '#fff', fontSize: '50px'}}>
                    {siteTitle}
                </h1>
                <p style={{color: '#fff'}}>{siteDescription}</p>
            </HeroSection>
            <div className='content'>
                {
                    currentPage ?
                        <SinglePage
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                        :
                        <Index pages={pages} setCurrentPage={setCurrentPage} />
                }
            </div>
            <Footer showPagesNav={true} pages={pages} />
        </StyledContainer>
    )
}

export default Layout