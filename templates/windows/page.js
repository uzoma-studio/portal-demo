// Single Page for Windows template
import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import Window from './components/window'
import RenderSinglePage from '@/app/utils/RenderSinglePage'

const Page = ({ pagePosition, pageData }) => {

    const { title, body, contentType } = pageData
    
    return (
        <Window position={pagePosition} title={title}>
            <RenderSinglePage contentType={contentType}>
                <BlocksRenderer content={body} />            
            </RenderSinglePage>
        </Window>
  )
}

export default Page