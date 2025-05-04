import React from 'react'
import ContentType from '../contentTypes/contentType'
import RichText from './richTextRenderer'
import CloseButton from '../components/closeButton'

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

const RenderSinglePageContent = ({ children, pageData, setCurrentPage }) => {
  const { title, contentType } = pageData
  return (
    <div>
        {title && <h1>{pageData.title}</h1> }
        {/* Display a close button if a close function has been provided */}
        { setCurrentPage && <CloseButton closeFn={() => setCurrentPage(null)} position={{x: 95, y: 5}} /> }
        { children }
        {/* TODO: The page content should not be shown all the time. With blog posts for example, it can be shown on the index page but it doesn't make sense to show it on the single post page. Same thing for the title actually */}
        <div className='content'>
          <RichText data={pageData.body} />
        </div>
        { contentType && <ContentType pageData={pageData} />}
    </div>
  )
}

export default RenderSinglePageContent