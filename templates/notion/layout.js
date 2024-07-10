'use client'

import React, { useContext, useState, useEffect } from 'react'
import { StyledContainer, StyledPageIcon } from './style'
import { AppContext } from '../../context'
import Page from './page'
import { findPage, renderCurrentPage } from '../../utils/utils'

import { config } from './template-config'
const { pageConfig } = config

// Import page components
import BannerImage from '@/app/components/bannerImage'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

// Import Util RenderPages component
import RenderPage from '@/app/utils/RenderPage'

const Layout = ({ pages }) => {

    const [currentPage, setCurrentPage] = useState(null)

    useEffect(() => {
        setCurrentPage(renderCurrentPage(pages))
      
        return () => {}
      }, [])

    // Get site metadata from React Context
    const context = useContext(AppContext)
    const { SiteTitle, SiteDescription } = context
    
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
                        <Page
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                        :
                        <>
                            <h1>{SiteTitle}</h1>
                            <h4>{SiteDescription}</h4>
                            <div className='pages-container'>
                                {
                                    pages.map((pageData) => {
                                        const pageHeaderImage = findPage(pageConfig, pageData.id).headerImage
                                        return <RenderPage 
                                                    openPageViaLink={true} 
                                                    pageSlug={pageData.slug} 
                                                    setCurrentPage={setCurrentPage} 
                                                    currentPage={pageData}
                                                >
                                                <StyledPageIcon>
                                                    <div className='img-container'>
                                                        {pageHeaderImage && <img src={pageHeaderImage} alt='header image' />}
                                                    </div>
                                                    <h6>{pageData.title}</h6>
                                                </StyledPageIcon>
                                        </RenderPage>
                                    })
                                }
                            </div>
                        </>
                }
            </div>
            <Footer showPagesNav={true} pages={pages} />
        </StyledContainer>
    )
}

export default Layout