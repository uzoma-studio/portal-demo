import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

const Single = ({ currentPage, setCurrentPage }) => {
  return (
    <div>
        <h1>{currentPage.attributes.Title}</h1>
        <p>{currentPage.attributes.Date}</p>
        <h4>{currentPage.attributes.Author}</h4>
        <button onClick={() => setCurrentPage(null)} style={{fontSize: '1.5rem', marginBottom: '1rem'}}>
            ⬅️
        </button>
        <br />
        <BlocksRenderer content={currentPage.attributes.Body} />
    </div>
  )
}

export default Single