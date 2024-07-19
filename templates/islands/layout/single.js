import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { StyledPageOverlay } from '../styles';
import RenderSinglePageContent from '@/app/utils/renderSinglePageContent';

const Single = ({ currentPage, setCurrentPage }) => {

    const { contentType } = currentPage

    return (
        <StyledPageOverlay>
            <RenderSinglePageContent contentType={contentType}>
                <h6
                    className='close-btn'
                    onClick={() => setCurrentPage(null)}
                >x</h6>
                <h1>
                    {currentPage.title}
                </h1>
                <div className='content'>
                    <BlocksRenderer content={currentPage.body} />
                </div>
            </RenderSinglePageContent>
        </StyledPageOverlay>
    )
}

export default Single