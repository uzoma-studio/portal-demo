import React from 'react'
import RenderSinglePageContent from '@/app/(frontend)/utils/renderSinglePageContent';
import CloseButton from '@/app/(frontend)/components/closeButton';

const SinglePage = ({ page, setCurrentPage }) => {
  return (
    <RenderSinglePageContent pageData={page}>
        <CloseButton closeFn={() => setCurrentPage(null)} position={{x: 80, y: 5}} />
        <div className='content'>
            <p>Body</p>
        </div>
    </RenderSinglePageContent>
  )
}

export default SinglePage