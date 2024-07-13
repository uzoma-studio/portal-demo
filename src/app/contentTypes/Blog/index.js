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
  
  const [currentPage, setCurrentPage] = useState(null)

  return (
    <div>
      {
        !currentPage ?
          data && 
            <StyledBlogPostsList>
                {
                    data.map((blogPost) => 
                        <li key={blogPost.id} onClick={() => setCurrentPage(blogPost)}>
                            <h4>{blogPost.attributes.Title}</h4>
                            <p>{blogPost.attributes.Date}</p>
                            <h6>{blogPost.attributes.Author}</h6>
                        </li>
                    )
                }
            </StyledBlogPostsList>
          :
          <Single currentPage={currentPage} setCurrentPage={setCurrentPage} />
      }
  </div>
  )
}

export default Blog