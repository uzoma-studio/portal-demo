// Single Page for Windows template
import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import Window from './components/window'

const Page = ({ pagePosition, pageData }) => {

    const { title, body } = pageData
    
    return (
        <Window position={pagePosition} title={title}>
            <BlocksRenderer content={body} />            
        </Window>
  )
}

export default Page