import React from 'react'
import { StyledPageOverlay } from '../styles';
import RenderSinglePageContent from '@/app/(frontend)/utils/renderSinglePageContent';

const Single = ({ currentPage, setCurrentPage }) => {

    return (
        <StyledPageOverlay>
            <RenderSinglePageContent pageData={currentPage}>
                <h6
                    className='close-btn'
                    onClick={() => setCurrentPage(null)}
                >x</h6>
                <div className='content'>
                    {/* <BlocksRenderer content={currentPage.body} /> */}
                    <p>Body</p>
                </div>
            </RenderSinglePageContent>
        </StyledPageOverlay>
    )
}

export default Single