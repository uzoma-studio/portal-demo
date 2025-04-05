import React from 'react'
import RichText from '../../utils/richTextRenderer'
import { parseDate } from 'utils/utils'
import Image from 'next/image'

const Single = ({ currentPost, setCurrentPost }) => {
  const { title, date, body, coverImage } = currentPost
  console.log(currentPost);
  
  return (
    <div>
        <h1>{title}</h1>
        <p>{parseDate(date)}</p>
        <button onClick={() => setCurrentPost(null)} style={{fontSize: '1.5rem', marginBottom: '1rem'}}>
            ⬅️
        </button>
        <br />
        {coverImage && <Image src={coverImage.url} width={500} height={500} alt={coverImage.alt} style={{objectFit: 'contain', margin: '2rem 0'}} /> }
        <RichText data={body} />
    </div>
  )
}

export default Single