'use client'

import React, { useEffect, useState } from 'react'
import { config } from '../template-config';
import Island from '../components/island';
import { findPage } from '../../../utils/utils';
import RenderPages from '@/app/(frontend)/utils/renderPages';
import usePageImages from '@/app/(frontend)/hooks/usePageImages'

const Index = ({ pages, setCurrentPage }) => {

    const pageImages = usePageImages(pages);

    return (
        <>
            {
                pages.map((pageData, index) => {

                    const pageImage = pageImages?.[index]?.url || null;
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

