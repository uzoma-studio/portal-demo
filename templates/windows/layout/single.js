// Single Page for Windows template
import React from 'react'
import Window from '../components/window'
import RenderSinglePageContent from '@/app/(frontend)/utils/renderSinglePageContent'

const Page = ({ pagePosition, pageData }) => {

    const { title, body } = pageData
    
    return (
        <Window position={pagePosition} title={title}>
            <RenderSinglePageContent pageData={pageData}>
                <p>Body</p>          
            </RenderSinglePageContent>
        </Window>
  )
}

export default Page