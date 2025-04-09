import React, { useState }  from 'react'

import RenderSinglePageContent from '@/app/(frontend)/utils/renderSinglePageContent'

import { StyledPage } from '../styles'

const SinglePage = ({ pageData, pagePosition }) => {

    const [ showPage, setShowPage ] = useState(false)

    return (
        <>
            {
                showPage ?
                    <StyledPage $position={pagePosition}>
                        <RenderSinglePageContent pageData={pageData} setCurrentPage={setShowPage} />
                    </StyledPage>
                    :
                    <div className="hotspot" 
                        style={{
                            left: `${pagePosition.x}%`,
                            top: `${pagePosition.y}%`,
                        }}
                        onClick={() => setShowPage(true)}
                    />
            }
        </>
    )
}

export default SinglePage