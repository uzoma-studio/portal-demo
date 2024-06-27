// Single Page for Windows template
import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import Window from './components/window'

const Page = ({ pagePosition, pageData }) => {

    const { Title, Body } = pageData
    
    return (
        <Window position={pagePosition} title={Title}>
            <BlocksRenderer content={Body} />            
        </Window>
  )
}

export default Page