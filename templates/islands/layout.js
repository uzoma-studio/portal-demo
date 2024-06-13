import React from 'react'
import './style.scss'

// this can actually be safely turned into a client component bc the data fetching has already been done?

const Layout = ({ pages }) => {

    const islands = pages.data

    return (
        <div className='islands-container'>
            {islands.map((island) => <p>{island.attributes.Title}</p>)}
        </div>
    )
}

export default Layout

