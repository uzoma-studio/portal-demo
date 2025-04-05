import React from 'react'
import RichText from '../../utils/richTextRenderer'
import { parseDate } from 'utils/utils'

const Single = ({ currentPost, setCurrentPost }) => {
  const { title, date, body} = currentPost
  return (
    <div>
        <h1>{title}</h1>
        <p>{parseDate(date)}</p>
        <button onClick={() => setCurrentPost(null)} style={{fontSize: '1.5rem', marginBottom: '1rem'}}>
            ⬅️
        </button>
        <br />
        <RichText data={body} />
    </div>
  )
}

export default Single