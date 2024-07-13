import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { StyledPageOverlay } from './styles';
import RenderSinglePage from '@/app/utils/RenderSinglePage';

const Page = ({ currentIsland, setCurrentIsland }) => {

    const { contentType } = currentIsland

    return (
        <StyledPageOverlay>
            <RenderSinglePage contentType={contentType}>
                <h6
                    className='close-btn'
                    onClick={() => setCurrentIsland(null)}
                >x</h6>
                <h1>
                    {currentIsland.title}
                </h1>
                <div className='content'>
                    <BlocksRenderer content={currentIsland.body} />
                </div>
            </RenderSinglePage>
        </StyledPageOverlay>
    )
}

export default Page