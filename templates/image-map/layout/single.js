import React, { useState, useContext, useRef, useEffect } from 'react'
import { AppContext } from '../../../context';
import Image from 'next/image'

import RenderSinglePageContent from '@/app/(frontend)/utils/renderSinglePageContent'

import { StyledPage } from '../styles'

const SinglePage = ({ pageData, pageConfig, pageDisplayStyle }) => {
    const [showPage, setShowPage] = useState(false)
    const pagePosition = pageConfig?.position
    const settings = useContext(AppContext)
    const displayMode = settings.theme.style?.displayMode || 'hotspots'
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


    const renderPageTrigger = () => {
        if (displayMode === 'icons') {
            console.log('Icon data:', pageConfig.icon)
            return (
                <div style={{
                    position: 'absolute',
                    left: `${pagePosition.x}%`,
                    top: `${pagePosition.y}%`,
                    cursor: 'pointer',
                }}
                    onClick={() => setShowPage(true)}
                >
                    <div 
                        className='page-icon' 
                        style={{
                            zIndex: '-1',
                            backgroundColor: settings.theme.style?.accentColor || '#9333ea',
                            padding: '12px',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <Image 
                            src={process.env.NODE_ENV === 'production' 
                                ? pageConfig.icon?.url 
                                : `/icons/${pageConfig.icon?.filename}`
                                || '/icons/default.svg'}
                            alt={pageConfig.hotspotName || pageData.title}
                            width={36}
                            height={36}
                            style={{
                                filter: 'brightness(0) invert(1)',
                                opacity: 0.9
                            }}
                        />
                    </div>
                    <p style={{
                        color: '#fff',
                        marginTop: '0.25rem',
                        fontSize: '0.875rem',
                        textAlign: 'center',
                        maxWidth: '120px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {pageConfig.hotspotName || pageData.title}
                    </p>
                </div>
            )
        }

        return (
            <div 
                className='hotspot' 
                style={{
                    left: `${pagePosition.x}%`,
                    top: `${pagePosition.y}%`,
                }}
                onClick={() => setShowPage(true)}
            >
                <div className="hotspot-icon" />
                <div className='hotspot-tooltip'>
                    <div className="tooltip-arrow" />
                    <p className='tooltip-text'>{pageConfig.hotspotName || pageData.title}</p>
                </div>
            </div>
        )
    }

    return (
        <>
            {pagePosition && showPage ? (
                <StyledPage 
                    ref={pageRef}
                    $position={pagePosition} 
                    $pageDisplayStyle={pageDisplayStyle} 
                    $settings={settings.theme}
                >
                    <RenderSinglePageContent pageData={pageData} setCurrentPage={setShowPage} />
                </StyledPage>
            ) : (
                renderPageTrigger()
            )}
        </>
    )
}

export default SinglePage