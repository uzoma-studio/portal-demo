'use client'

import React, { useContext } from 'react'
import { StyledContainer } from './style'
import { AppContext } from '../../context'
import Page from './page'

const Layout = ({ pages }) => {
    
    const data = pages.data
    const context = useContext(AppContext)

    const { SiteTitle, SiteDescription } = context

    return (
        <StyledContainer>
            <div className='header'>
            </div>
            <div className='content'>
                <h1>{SiteTitle}</h1>
                <h4>{SiteDescription}</h4>
                <div className='pages-container'>
                    { 
                        data.map((page, index) => 
                            <Page 
                                key={page.id}
                                pageData={page.attributes}
                            />
                        )
                    }
                </div>
            </div>
        </StyledContainer>
    )
}

export default Layout