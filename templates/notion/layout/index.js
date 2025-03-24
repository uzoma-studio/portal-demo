import React, { useContext } from 'react'

import { AppContext } from '../../../context'
import { findPage } from '../../../utils/utils'

import { config } from '../template-config'
const { pageConfig } = config

import { StyledPageIcon } from '../style'

import RenderPages from '@/app/(frontend)/utils/renderPages'

const Index = ({ pages, setCurrentPage }) => {

    // Get site metadata from React Context
    const context = useContext(AppContext)
    const { siteTitle, siteDescription } = context

    return (
        <>
            <div className='pages-container'>
                {
                    pages.map((pageData) => {
                        const pageHeaderImage = pageData.coverImage ? `${process.env.STRAPI_URL}${pageData.coverImage.data.attributes.url}` : null
                        return <RenderPages
                                    openPageViaLink={true}
                                    pageSlug={pageData.slug}
                                    setCurrentPage={setCurrentPage}
                                    currentPage={pageData}
                                    key={pageData.id}
                                >
                                    <StyledPageIcon>
                                        <div className='img-container'>
                                            {pageHeaderImage && <img src={pageHeaderImage} alt='header image' />}
                                        </div>
                                        <h6>{pageData.title}</h6>
                                    </StyledPageIcon>
                        </RenderPages>
                    })
                }
            </div>
        </>
    )
}

export default Index