/**
 * Header root component https://www.notion.so/uzoma-studio/Create-Root-Components-1a4327f6834d4f1f876ae0989ed63ce6?pvs=4
 * 
 * @type {Prop} image
 * @type {Prop} color
 */

import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.div`
    background: ${props => props.$image ? props.$image : ( props.$color ? props.$color : '#000' )};
    height: 15rem;
`

const Header = ({ image, color }) => {
    return (
        <StyledHeader
            $image={image}
            $color={color}
        >
        </StyledHeader>
    )
}

export default Header