'use client'

import React, { useContext, useState } from 'react'
import { StyledContainer, StyledPageIcon } from './style'
import { AppContext } from '../../context'
import Page from './page'
import { findPage } from '../../utils/utils'
import { config } from './template-config'
const { pageConfig } = config

// Import page components
import BannerImage from '@/app/components/bannerImage'
import Header from '@/app/components/header'
import Footer from '@/app/components/Footer'

const Layout = ({ pages }) => {

    const [currentPage, setCurrentPage] = useState(null)

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
                                    pages.map(({ id, title, body }) => {
                                        const pageHeaderImage = findPage(pageConfig, id).headerImage

                                        return <StyledPageIcon key={id} onClick={() => setCurrentPage({ id, title, body })}>
                                            <div className='img-container'>
                                                { pageHeaderImage && <img src={pageHeaderImage} alt='header image' /> }
                                            </div>
                                            <h6>{ title }</h6>
                                        </StyledPageIcon>
                                    })
                                }
                            </div>
                        </>
                }
            </div>
            <Footer />
        </StyledContainer>
    )
}

export default Layout