import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

const Page = ({ currentPage, setCurrentPage }) => {

    const { title, body } = currentPage

    return (
        <div>
            <h1 style={{fontSize: '4rem'}}>{title}</h1>
            <button 
                onClick={() => setCurrentPage(null)} 
                style={{
                    fontSize: '1.5rem', 
                    marginBottom: '1rem'
                }}>
                ⬅️
            </button>
            <BlocksRenderer content={body} />
        </div>
    )
}

export default Page