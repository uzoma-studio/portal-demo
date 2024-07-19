import React from 'react'
import ContentType from '../contentTypes/contentType'

const RenderSinglePageContent = ({ children, pageData }) => {
  const { title, contentType } = pageData
  return (
    <div>
        {title && <h1>{pageData.title}</h1> }
        { children }
        { contentType && <ContentType type={contentType} />}
    </div>
  )
}

export default RenderSinglePageContent