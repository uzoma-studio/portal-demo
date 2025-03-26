import React from 'react'
import { StyledPageOverlay } from '../styles';
import RenderSinglePageContent from '@/app/(frontend)/utils/renderSinglePageContent';

const Single = ({ currentPage, setCurrentPage }) => {

    return (
        <StyledPageOverlay>
            <RenderSinglePageContent pageData={currentPage} setCurrentPage={setCurrentPage} />
        </StyledPageOverlay>
    )
}

export default Single