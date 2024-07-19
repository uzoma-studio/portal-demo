// Re-usable Window component that can be used across templates

import React, { useRef }  from 'react'
import Draggable from 'react-draggable'

import { config } from '../template-config'
import styled from 'styled-components'

const { style } = config
const { statusBar } = style

const StyledWindow = styled.div`
    border-color: ${style.borderColor};
    border-style: ridge;
    border-width: ${style.borderSize};
    box-shadow: 4px 4px 10px 0 rgba(0,0,0,.5);
    left: ${props => `${props.$position.x}%`};
    top: ${props => `${props.$position.y}%`};

    position: absolute;
    width: 350px;
    height: 350px;
    resize: both;
    overflow: auto;

    .status-bar {
        width: 100%;
        height: 28px;
        background: ${statusBar.backgroundColor};
        border-left-color: ${statusBar.borderLeftColor};
        border-bottom: ${statusBar.borderBottom};
        border-right-color: ${statusBar.borderRightColor};
        border-top-color: ${statusBar.borderTopColor};
        letter-spacing: ${statusBar.letterSpacing};
        font-family: ${style.bodyFont};

        display: flex;
        justify-content: space-between;
        cursor: grab;

        .close-btn {
            color: red;
            font-family: ${style.headerFont};
            font-weight: bold;
        }
    }
    
    .content {
        height: calc(100% - 28px);
        width: 100%;
        overflow-x: hidden;
        background: #fff;
        padding: 20px;
        font-family: ${style.bodyFont}
    }
    
    .content * {
        margin: .5rem 0;
    }
`

const Window = ({ position, title, children }) => {

    const windowRef = useRef(null)

    const bringWindowToFront = () => {

        const windows = document.getElementsByClassName('window');

        Array.from(windows).forEach((windowElement) => {
            windowElement.style.zIndex = '';
        });

        const window = windowRef.current
        if (window){
            window.style.zIndex = '998';
        }
    }
    
    return (
        <Draggable handle='.status-bar' onStart={bringWindowToFront} bounds='.container'>
            <StyledWindow 
                $position={position}
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
                    { children }         
                </div>
            </StyledWindow>
        </Draggable>
  )
}

export default Window