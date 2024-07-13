import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import BackButton from '@/app/components/BackButton'
import RenderSinglePage from '@/app/utils/RenderSinglePage'

const Page = ({ currentPage, setCurrentPage }) => {

    const { title, body, contentType } = currentPage

    return (
        <RenderSinglePage contentType={contentType}>
            <h1 style={{fontSize: '4rem'}}>{title}</h1>
            <BackButton onClickFn={setCurrentPage} prevPage={null} />
            <BlocksRenderer content={body} />
        </RenderSinglePage>
    )
}

export default Page