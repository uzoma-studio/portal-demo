import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { StyledPageOverlay } from './styles';

const Page = ({ data }) => {

    console.log(data);
    
    return (
        <StyledPageOverlay>
            <h6 className='close-btn'>x</h6>
            <h1>
                {data.title}
            </h1>
            <div className='content'>
                <BlocksRenderer content={data.body} />
            </div>
        </StyledPageOverlay>
    )
}

export default Page