import React, { useContext } from 'react'

import { AppContext } from '../../../context'

import { config } from '../template-config'

import { StyledPageIcon } from '../style'

import RenderPages from '@/app/(frontend)/utils/renderPages'

import { getCoverImageUrl } from 'utils/utils'

const Index = ({ pages, setCurrentPage }) => {

    // Get site metadata from React Context
    const context = useContext(AppContext)
    const { siteTitle, siteDescription } = context

    return (
        <>
            <div className='pages-container'>
                {
                    pages.map((pageData) => {
                        const pageHeaderImage = getCoverImageUrl(pageData.coverImage)
                        
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