import React from 'react'
import RenderSinglePageContent from '@/utils/renderSinglePageContent';
import CloseButton from '@/components/closeButton';

const SinglePage = ({ page, setCurrentPage }) => {
  return (
    <RenderSinglePageContent pageData={page} setCurrentPage={setCurrentPage} />
  )
}

export default SinglePage