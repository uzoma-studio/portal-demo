'use client'

import React from 'react'
import './style.scss'
import Page from './page'
import Draggable from 'react-draggable'
import { config } from './template-config';

const Layout = ({ pages }) => {

    const data = pages.data
    console.log(data);
    
    const getPageConfig = (pageId) => {
        return config.pageConfig.find(({ id }) => id === pageId)
    }

    return (
        <div className='windows-container'>
            {
                data.map((page) => {
                    return <Draggable>
                        <Page 
                            pagePosition={getPageConfig(page.id).position}
                            pageData={page.attributes} 
                        />
                    </Draggable>
                })
            }
        </div>
    )
}

export default Layout