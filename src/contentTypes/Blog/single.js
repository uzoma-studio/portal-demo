import React, { useEffect } from 'react'
import RichText from '@/utils/richTextRenderer'
import { parseDate } from '@/utils/helpers'
import Image from 'next/image'

const Single = ({ currentPost, setCurrentPost, setIsPageIndex }) => {
  const { title, date, body, coverImage } = currentPost

  useEffect(() => {
    setIsPageIndex(false)
  }, [])
  
  
  return (
    <div>
        <button 
          onClick={() => { setCurrentPost(null); setIsPageIndex(true) }}
          style={{fontSize: '2rem', marginBottom: '1rem'}}
        >
            ⬅️
        </button>
        <h1>{title}</h1>
        <p>{parseDate(date)}</p>
        <br />
        {coverImage && <Image src={coverImage.url} width={500} height={500} alt={coverImage.alt} style={{objectFit: 'contain', margin: '2rem 0'}} /> }
        <RichText data={body} />
    </div>
  )
}

export default Single