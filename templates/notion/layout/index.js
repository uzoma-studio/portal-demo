import React, { useContext } from 'react'

import { AppContext } from '../../../context'

import { config } from '../template-config'

import { StyledPageIcon } from '../style'

import RenderPages from '@/app/(frontend)/utils/renderPages'

import usePageImages from '@/app/(frontend)/hooks/usePageImages'

const Index = ({ pages, setCurrentPage }) => {

    // Get site metadata from React Context
    const context = useContext(AppContext)
    
    // Get images for each page
    const pageImages = usePageImages(pages);

    return (
        <>
            <div className='pages-container'>
                {
                    pages.map((pageData, index) => {
                        const pageHeaderImage = pageImages?.[index]?.url || null;
                        
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