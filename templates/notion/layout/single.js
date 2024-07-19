import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import BackButton from '@/app/components/BackButton'
import RenderSinglePageContent from '@/app/utils/renderSinglePageContent'

const Page = ({ currentPage, setCurrentPage }) => {

    const { body } = currentPage

    return (
        <RenderSinglePageContent pageData={currentPage}>
            <BackButton onClickFn={setCurrentPage} prevPage={null} />
            <BlocksRenderer content={body} />
        </RenderSinglePageContent>
    )
}

export default Page