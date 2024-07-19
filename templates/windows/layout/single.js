// Single Page for Windows template
import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import Window from '../components/window'
import RenderSinglePageContent from '@/app/utils/renderSinglePageContent'

const Page = ({ pagePosition, pageData }) => {

    const { title, body } = pageData
    
    return (
        <Window position={pagePosition} title={title}>
            <RenderSinglePageContent pageData={pageData}>
                <BlocksRenderer content={body} />            
            </RenderSinglePageContent>
        </Window>
  )
}

export default Page