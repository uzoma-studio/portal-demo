import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

const Single = ({ currentPost, setCurrentPost }) => {
  const { id, attributes: { Title, Date, Author, Body }} = currentPost
  return (
    <div>
        <h1>{Title}</h1>
        <p>{Date}</p>
        <h4>{Author}</h4>
        <button onClick={() => setCurrentPost(null)} style={{fontSize: '1.5rem', marginBottom: '1rem'}}>
            ⬅️
        </button>
        <br />
        <BlocksRenderer content={Body} />
    </div>
  )
}

export default Single