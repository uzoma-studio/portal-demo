// Single Page for Windows template
import React from 'react'
import Window from '../components/window'
import RenderSinglePageContent from '@/app/(frontend)/utils/renderSinglePageContent'
import RichText from '@/app/(frontend)/utils/richTextRenderer'

const Page = ({ pagePosition, pageData }) => {

    const { title, body } = pageData
    
    return (
        <Window position={pagePosition} title={title}>
            <RenderSinglePageContent pageData={pageData} />
        </Window>
  )
}

export default Page