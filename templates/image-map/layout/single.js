import React, { useState, useContext } from 'react'
import { AppContext } from '../../../context';

import RenderSinglePageContent from '@/app/(frontend)/utils/renderSinglePageContent'

import { StyledPage } from '../styles'

const SinglePage = ({ pageData, pageConfig, pageDisplayStyle }) => {

    const [ showPage, setShowPage ] = useState(false)
    
    const pagePosition = pageConfig?.position

    const settings = useContext(AppContext)

    return (
        <>
            {
                pagePosition && showPage ?
                    <StyledPage $position={pagePosition} $pageDisplayStyle={pageDisplayStyle} $settings={settings.theme.config}>
                        <RenderSinglePageContent pageData={pageData} setCurrentPage={setShowPage} />
                    </StyledPage>
                    :
                    <div className='hotspot' style={{
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
            }
        </>
    )
}

export default SinglePage