import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { StyledPageOverlay } from './styles';



const Page = ({ currentIsland, setCurrentIsland }) => {

    return (
        <StyledPageOverlay>
            <h6
                className='close-btn'
                onClick={() => setCurrentIsland(null)}
            >x</h6>
            <h1>
                {currentIsland.attributes.Title}
            </h1>
            <div className='content'>
                <BlocksRenderer content={currentIsland.attributes.Body} />
            </div>
        </StyledPageOverlay>
    )
}

export default Page