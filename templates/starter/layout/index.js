'use client'

import React from 'react'
import { config } from '../template-config';
import { findPage } from '../../../utils/utils';
import RenderPages from '@/app/utils/renderPages';

const Index = ({ pages, setCurrentPage }) => {
  return (
    <>
        {
            pages.map((pageData) => 
                <RenderPages
                    key={pageData.id}
                    openPageViaLink={true}
                    pageSlug={pageData.slug}
                    setCurrentPage={setCurrentPage}
                    currentPage={pageData}
                >   
                    <h1 style={{cursor: 'pointer'}}>{pageData.title}</h1>
                </RenderPages>
            )
        }
    </>
  )
}

export default Index