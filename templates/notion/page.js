import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import BackButton from '@/app/components/BackButton'
import ContentType from '@/app/contentTypes/contentType'

const Page = ({ currentPage }) => {

    const { title, body, contentType } = currentPage

    return (
        <div>
            <h1 style={{fontSize: '4rem'}}>{title}</h1>
            <BackButton onClickFn={setCurrentPage} prevPage={null} />
            <BlocksRenderer content={body} />
            {
                contentType && 
                    <ContentType type={contentType} />
            }
        </div>
    )
}

export default Page