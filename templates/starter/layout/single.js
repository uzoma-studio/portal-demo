import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import RenderSinglePageContent from '@/app/utils/renderSinglePageContent';
import CloseButton from '@/app/components/closeButton';

const SinglePage = ({ page, setCurrentPage }) => {
  return (
    <RenderSinglePageContent pageData={page}>
        <CloseButton closeFn={() => setCurrentPage(null)} position={{x: 80, y: 5}} />
        <div className='content'>
            <BlocksRenderer content={page.body} />
        </div>
    </RenderSinglePageContent>
  )
}

export default SinglePage