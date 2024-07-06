// Re-usable component that can be used across templates

import React from 'react'
import styled from 'styled-components'

const StyledIslandContainer = styled.div`
    position: absolute;
    width: 50%;
    left: ${props => `${props.$image.position.x}%`};
    top: ${props => `${props.$image.position.y}%`};

    &:hover {
        filter: brightness(0.9);
    };

    img {
        min-width: 100px;
        min-height: 100px;
        background-repeat: no-repeat;
        position: absolute;
        cursor: pointer;
    }

    p {
        position: relative;
        z-index: 99;
    }
`

const Island = ({ pageData, setCurrentIsland }) => {
    return (
        <StyledIslandContainer
            $image={pageData.pageImage}
            key={pageData.id}
        >
            <img
                src={pageData.pageImage.url}
                alt=''
                onClick={() => setCurrentIsland(pageData)}
            />
            <p>{pageData.title}</p>
        </StyledIslandContainer>
    )
}

export default Island