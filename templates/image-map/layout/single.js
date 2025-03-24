import React, { useState }  from 'react'

import RenderSinglePageContent from '@/app/(frontend)/utils/renderSinglePageContent'

import { StyledPage } from '../styles'
import CloseButton from '@/app/(frontend)/components/closeButton'

const SinglePage = ({ pageData, pagePosition }) => {

    const [ showPage, setShowPage ] = useState(false)

    return (
        <>
            {
                showPage ?
                    <StyledPage $position={pagePosition}>
                        <CloseButton closeFn={() => setShowPage(false)} position={{x: 90, y: 0}} />
                        <RenderSinglePageContent pageData={pageData}>
                            {/* <BlocksRenderer content={pageData.body} /> */}
                            <h1>Hello</h1>
                        </RenderSinglePageContent>
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