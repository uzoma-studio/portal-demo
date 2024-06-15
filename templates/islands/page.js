import React from 'react'
import './style.scss'

const Page = ({ currentIsland, setCurrentIsland, style }) => {

    return (
        <div className='single-island-overlay'>
            <h6
                className='close-btn'
                onClick={() => setCurrentIsland(null)}
            >x</h6>
            {/* <img
                src={currentIsland.imageUrl}
                alt=''
            /> */}
            <h1 style={
                {color: style.headerFontColor, fontFamily: style.headerFont}
            }>
                {currentIsland.attributes.Title}
            </h1>
        </div>
    )
}

export default Page