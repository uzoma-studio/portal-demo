import React, { useRef, useEffect } from 'react'
import { SpaceContext } from '@/context/SpaceProvider'
import Image from 'next/image'

import RenderSinglePageContent from '@/utils/renderSinglePageContent'

import { StyledPage } from '../styles'

const SinglePage = ({ pageData, pageConfig, pageDisplayStyle, showPage, setShowPage }) => {
    const pagePosition = pageConfig?.position
    const pageRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pageRef.current && !pageRef.current.contains(event.target)) {
                setShowPage(false)
            }
        }

        if (showPage) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showPage])

    const calculatePagePosition = (pagePosition) => {
        const x = pagePosition.x
        const y = pagePosition.y < 40 ? pagePosition.y + 10 : pagePosition.y - 10
        return { x, y}
    }

    return (
        <>
            <StyledPage 
                ref={pageRef}
                $pageDisplayStyle={pageDisplayStyle} 
                $settings={pageConfig}
            >
                <RenderSinglePageContent pageData={pageData} setCurrentPage={setShowPage} />
            </StyledPage>
        </>
    )
}

export default SinglePage