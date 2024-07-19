import React, { useState }  from 'react'

import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import RenderSinglePageContent from '@/app/utils/renderSinglePageContent'

import { StyledPage } from '../styles'
import CloseButton from '@/app/components/closeButton'

const SinglePage = ({ pageData, pagePosition }) => {

    const [ showPage, setShowPage ] = useState(false)

    return (
        <>
            {
                showPage ?
                    <StyledPage $position={pagePosition}>
                        <CloseButton closeFn={() => setShowPage(false)} position={{x: 90, y: 0}} />
                        <RenderSinglePageContent pageData={pageData}>
                            <BlocksRenderer content={pageData.body} />
                        </RenderSinglePageContent>
                    </StyledPage>
                    :
                    <div class="hotspot" 
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