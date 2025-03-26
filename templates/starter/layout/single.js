import React from 'react'
import RenderSinglePageContent from '@/app/(frontend)/utils/renderSinglePageContent';
import CloseButton from '@/app/(frontend)/components/closeButton';

const SinglePage = ({ page, setCurrentPage }) => {
  return (
    <RenderSinglePageContent pageData={page} setCurrentPage={setCurrentPage} />
  )
}

export default SinglePage