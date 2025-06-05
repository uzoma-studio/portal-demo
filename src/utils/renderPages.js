import React from 'react'
import { useRouter } from 'next/navigation'

/**
 * RenderPages component to conditionally render its children as a link or plain content.
 *
 * This component renders its children either as a clickable div that sets the current page
 * and navigates to a new URL, or as plain content, based on the openPageViaLink prop.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children elements to render.
 * @param {boolean} props.openPageViaLink - Determines if the children should be rendered as a clickable div.
 * @param {string} props.pageSlug - The slug for the current page to navigate to.
 * @param {Function} props.setCurrentPage - The function to set the current page.
 * @param {Object} props.currentPage - The current page object to set.
 * @returns {JSX.Element} - The rendered content, either as a link or plain content.
 */
const RenderPages = ({ children, openPageViaLink, pageSlug, setCurrentPage, currentPage }) => {

    const router = useRouter()

    const setAsCurrentPage = () => {
        setCurrentPage(currentPage)
        router.push(`/#${pageSlug}`)
    }

  return <>
        {
            openPageViaLink ?
                <span onClick={() => setAsCurrentPage()} style={{width: '45%'}}>
                    {children}
                </span>
                :
                <>{children}</>
        }
    </>
}

export default RenderPages