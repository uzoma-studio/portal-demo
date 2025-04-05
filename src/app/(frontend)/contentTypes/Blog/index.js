import React, { useState } from 'react'
import styled from 'styled-components'
import Single from './single'
import Image from 'next/image'
import { parseDate } from 'utils/utils'

const StyledBlogPostsList = styled.ul`
    li {
        border: 1px solid rgba(0, 0, 0, 0.5);
        padding: .5rem 0;
        margin: 2rem 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        min-height: 10rem;

        img {
          object-fit: contain;
          margin: 0 20px;
        }

        &:hover {
            background-color: rgba(235, 235, 235);
        }
    }
`

const Blog = ({ data }) => {
  
  const [currentPost, setCurrentPost] = useState(null)
  const coverImage = data[0].coverImage

  return (
    <div>
      {
        !currentPost ?
          data && 
            <StyledBlogPostsList>
                {
                    data.map((blogPost) => {
                      const { id, title, date } = blogPost
                      return <li key={id} onClick={() => setCurrentPost(blogPost)}>
                          {coverImage && <Image src={coverImage.url} width={100} height={150} alt={coverImage.alt} /> }
                          <div className='text'>
                            <h4>{title}</h4>
                            <p>{parseDate(date)}</p>
                          </div>
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