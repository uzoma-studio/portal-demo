import React from 'react'
import BackButton from '@/app/(frontend)/components/BackButton'
import RenderSinglePageContent from '@/app/(frontend)/utils/renderSinglePageContent'

const Page = ({ currentPage, setCurrentPage }) => {

    const { body } = currentPage

    return (
        <RenderSinglePageContent pageData={currentPage}>
            <BackButton onClickFn={setCurrentPage} prevPage={null} />
            {/* <BlocksRenderer content={body} /> */}
            <p>Body</p>
        </RenderSinglePageContent>
    )
}

export default Page