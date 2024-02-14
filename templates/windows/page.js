// Single Page for Windows template

import React, { useRef }  from 'react'
import './style.scss'
import Draggable from 'react-draggable'

const Page = ({ coords, content, title }) => {

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
    
    return (
        <Draggable handle='.status-bar' onStart={bringWindowToFront} bounds='.container'>
            <div className='window' style={{
                left: `${coords.x}%`,
                top: `${coords.y}%`
                }}
                ref={windowRef}
            >
                <div className='status-bar'>
                    <h6>{` `}</h6>
                    <h6 className='title'>{title}</h6>
                    <h6
                        className='close-btn'
                    >x</h6>
                </div>
                <div className='content'>
                    <iframe
                        src={`${content}/pub?embedded=true`}
                    />
                </div>
            </div>
        </Draggable>
  )
}

export default Page