'use client'

import React from 'react'
import './style.scss'
import Page from './page'
import Draggable from 'react-draggable'

import data from '../../data/data.json'

const Layout = () => {

    // TODO: Implement non-hardcoded solution
    const coords = [
        { x: 5, y: 10 },
        { x: 70, y: 5 },
        { x: 30, y: 55 },
        { x: 60, y: 30 },
        { x: 40, y: 45 },
        { x: 35, y: 25 },
        { x: 20, y: 15 },
    ]

    // return an x and y coordinate for islands
    const getPosition = (id) => {
        return coords[id]
    }

    return (
        <div className='container'>
            {
                data.map(({ name, contentUrl }, index) => {
                    const coords = getPosition(index)
                    return <Draggable>
                        <Page 
                            coords={coords} 
                            content={contentUrl}
                            title={name} 
                        />
                    </Draggable>
                })
            }
        </div>
    )
}

export default Layout