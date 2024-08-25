'use client'

import React from 'react'
import { config } from '../template-config';
import Island from '../components/island';
import { findPage, getCoverImageUrl } from '../../../utils/utils';
import RenderPages from '@/app/utils/renderPages';

const Index = ({ pages, setCurrentPage }) => {

    return (
        <>
            {
                pages.map((pageData) => {

                    const pageImage = getCoverImageUrl(pageData.coverImage)
                    const pageImagePosition = findPage(config.pageConfig, pageData.id).coverImage.position

                    return <RenderPages
                                key={pageData.id}
                                openPageViaLink={true}
                                pageSlug={pageData.slug}
                                setCurrentPage={setCurrentPage}
                                currentPage={pageData}
                            >
                                <Island 
                                    pageData={{...pageData, pageImage, pageImagePosition}} 
                                    setCurrentPage={setCurrentPage}
                                />
                            </RenderPages>
                })
            }
        </>
    )
}

export default Index

