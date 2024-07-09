import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import BackButton from '@/app/components/BackButton'

const Page = ({ currentPage, setCurrentPage }) => {

    const { title, body } = currentPage
    
    return (
        <div>
            <h1 style={{fontSize: '4rem'}}>{title}</h1>
            <BackButton onClickFn={setCurrentPage} prevPage={null} />
            <BlocksRenderer content={body} />
        </div>
    )
}

export default Page