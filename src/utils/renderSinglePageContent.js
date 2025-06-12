import React, { useState } from 'react'
import ContentType from '@/contentTypes/contentType'
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
  // Used to track whether a page is an index page or a sub-page
  const [ isPageIndex, setIsPageIndex ] = useState(true)

  return (
    <div>
        {title && isPageIndex && <h4 className='mb-8'>{pageData.title}</h4> }
        {/* Display a close button if a close function has been provided */}
        { setCurrentPage && <CloseButton closeFn={() => setCurrentPage(null)} position={{x: 95, y: 0}} /> }
        
        {isPageIndex && (
          <>
            {children}
            <div className='content'>
              <RichText data={pageData.body} />
            </div>
          </>
        )}
        
        { contentType && contentType !== 'page' && <ContentType pageData={pageData} setIsPageIndex={setIsPageIndex} />}
    </div>
  )
}

export default RenderSinglePageContent