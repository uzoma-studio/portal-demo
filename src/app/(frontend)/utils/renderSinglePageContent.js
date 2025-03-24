import React from 'react'
import ContentType from '../contentTypes/contentType'

/**
 * RenderSinglePageContent component
 * 
 * This component renders the content of a single page. It displays the page title
 * if provided, any child components passed as children, and a specific content type 
 * component based on the contentType property in pageData.
 * 
 * @param {Object} props - The props object
 * @param {React.ReactNode} props.children - The child components to be rendered within this component
 * @param {Object} props.pageData - The data for the current page
 * @param {string} [props.pageData.title] - The title of the page (optional)
 * @param {string} [props.pageData.contentType] - The type of content to be rendered (optional)
 * 
 * @returns {JSX.Element} The rendered page content
 */

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