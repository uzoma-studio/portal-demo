import React from 'react'
import BackButton from '@/app/(frontend)/components/BackButton'
import RenderSinglePageContent from '@/app/(frontend)/utils/renderSinglePageContent'

const Page = ({ currentPage, setCurrentPage }) => {

    return (
        <RenderSinglePageContent pageData={currentPage}>
            <BackButton onClickFn={setCurrentPage} prevPage={null} />
        </RenderSinglePageContent>
    )
}

export default Page