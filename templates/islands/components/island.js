// Re-usable component (or element) that can be used across templates

import React from 'react'
import styled from 'styled-components'

const StyledSingleIslandContainer = styled.div`
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

const Island = ({ data, image, setCurrentIsland }) => {
    return (
        <StyledSingleIslandContainer
            $image={image}
            key={data.id}
        >
            <img
                src={image.url}
                alt=''
                onClick={() => setCurrentIsland(data)}
            />
            <p>{data.attributes.Title}</p>
        </StyledSingleIslandContainer>
    )
}

export default Island