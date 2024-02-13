'use client'

import React, { useState } from 'react'
import './style.scss'
import Page from './page'

import islandsData from '../../data/data.json'

const Layout = () => {

    const [currentIsland, setCurrentIsland] = useState(null)

    // TODO: Implement non-hardcoded solution
    const coords = [
        { x: 5, y: 10 },
        { x: 90, y: 15 },
        { x: 30, y: 75 },
        { x: 60, y: 150 },
        { x: 120, y: 85 },
        { x: 150, y: 225 },
        { x: 20, y: 225 },
    ]

    // return an x and y coordinate for islands
    const getIslandPosition = (id) => {
        return coords[id]
    }

    return (
        <div className='container'>
            {
                islandsData.map(({ name, imageUrl }, index) => {
                    const islandCoords = getIslandPosition(index)
                    return <div
                        className='island-container'
                        style={{
                            left: `${islandCoords.x}%`,
                            top: `${islandCoords.y}%`
                        }}
                    >
                        <img
                            key={name}
                            src={imageUrl}
                            alt=''
                            className='island'
                            onClick={() => setCurrentIsland(islandsData[index])}
                        />
                        <p className='title'>{name}</p>
                    </div>
                })
            }

            {
                currentIsland &&
                    <Page 
                        currentIsland={currentIsland} 
                        setCurrentIsland={setCurrentIsland}
                    />
            }
        </div>
    )
}

export default Layout