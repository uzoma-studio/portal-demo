// Single Page for Windows template

import React, { useRef }  from 'react'
import './style.scss'
import Draggable from 'react-draggable'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

const Page = ({ pagePosition, pageData }) => {

    const windowRef = useRef(null)

    const bringWindowToFront = () => {

        const windows = document.getElementsByClassName('window');

        Array.from(windows).forEach((windowElement) => {
            windowElement.style.zIndex = '';
        });


        const window = windowRef.current
        if (window) {
            window.style.zIndex = '998';
        }
    }

    const { Title, Body } = pageData
    
    return (
        <Draggable handle='.status-bar' onStart={bringWindowToFront} bounds='.container'>
            <div className='window' style={{
                left: `${pagePosition.x}%`,
                top: `${pagePosition.y}%`
                }}
                ref={windowRef}
            >
                <div className='status-bar'>
                    <h6>{` `}</h6>
                    <h6 className='title'>{Title}</h6>
                    <h6
                        className='close-btn'
                    >x</h6>
                </div>
                <div className='content'>
                    <BlocksRenderer content={Body} />            
                </div>
            </div>
        </Draggable>
  )
}

export default Page