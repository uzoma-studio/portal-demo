import React from 'react'
import ContentType from '../contentTypes/contentType'

const RenderSinglePage = ({ children, contentType }) => {
  return (
    <>
        { children }
        { contentType && <ContentType type={contentType} />}
    </>
  )
}

export default RenderSinglePage