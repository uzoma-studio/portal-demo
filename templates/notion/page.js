'use client'

import React, { useState, useEffect } from 'react'
import { StyledContainer } from './style'
import { renderCurrentPage } from '../../utils/utils'

// Import root components
import BannerImage from '@/app/components/bannerImage'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

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
            <Header 
                showPagesNav={true}
                pages={pages}
            />
            <BannerImage
                image={'url(/assets/planets/universe.jpeg)'}
            />
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