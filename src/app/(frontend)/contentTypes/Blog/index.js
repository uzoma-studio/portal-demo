import React, { useState } from 'react'
import styled from 'styled-components'
import Single from './single'

const StyledBlogPostsList = styled.ul`
    li {
        border: 1px solid rgba(0, 0, 0, 0.5);
        padding: .5rem 4rem;
        border-radius: 10px;
        margin: 2rem 0;
        cursor: pointer;

        &:hover {
            background-color: rgba(235, 235, 235);
        }
    }
`

const Blog = ({ data }) => {
  
  const [currentPost, setCurrentPost] = useState(null)

  return (
    <div>
      {
        !currentPost ?
          data && 
            <StyledBlogPostsList>
                {
                    data.map((blogPost) => {
                      const { id, attributes: { Title, Date, Author }} = blogPost
                      return <li key={id} onClick={() => setCurrentPost(blogPost)}>
                          <h4>{Title}</h4>
                          <p>{Date}</p>
                          <h6>{Author}</h6>
                      </li>
                    })
                }
            </StyledBlogPostsList>
          :
          <Single currentPost={currentPost} setCurrentPost={setCurrentPost} />
      }
  </div>
  )
}

export default Blog