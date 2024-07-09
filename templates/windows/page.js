// Single Page for Windows template
import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { config } from './template-config'
import Window from './components/window'

const Page = ({ getPagePosition, pageData }) => {

    const { title, body } = pageData
    
    return (
        <Window position={getPagePosition(config.pageConfig, pageData.id)} title={title}>
            <BlocksRenderer content={body} />            
        </Window>
  )
}

export default Page