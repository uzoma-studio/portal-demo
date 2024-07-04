'use client'

import React, { useContext, useState } from 'react'
import { StyledContainer, StyledPage } from './style'
import { AppContext } from '../../context'
import Page from './page'
import { findPage } from '../../utils/utils'
import { config } from './template-config'
const { pageConfig } = config

// Import page components
import Header from '@/app/components/headerImage'

const Layout = ({ pages }) => {

    const data = pages.data

    const [currentPage, setCurrentPage] = useState(null)

    // Get site metadata from React Context
    const context = useContext(AppContext)
    const { SiteTitle, SiteDescription } = context

    return (
        <StyledContainer>
            <Header
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
                                    data.map(({ id, attributes }) => {
                                        const page = findPage(pageConfig, id)
                                        const pageHeaderImage = page.headerImage

                                        return <StyledPage
                                            key={id}
                                            onClick={() => setCurrentPage({id, attributes})}
                                        >
                                            <div className='img-container'>
                                                { pageHeaderImage && <img src={pageHeaderImage} alt='header image' /> }
                                            </div>
                                            { attributes.Title }
                                        </StyledPage>
                                    })
                                }
                            </div>
                        </>
                }
            </div>
        </StyledContainer>
    )
}

export default Layout