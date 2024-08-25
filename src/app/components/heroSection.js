/**
 * Hero Section root component https://www.notion.so/uzoma-studio/Create-Root-Components-1a4327f6834d4f1f876ae0989ed63ce6?pvs=4
 * 
 * @type {Prop} image
 * @type {Prop} color
 * @type {Prop} background
 */

import React from 'react'
import styled from 'styled-components'

const StyledHeroSection = styled.div`
    background: ${props => props.$image ? props.$image : ( props.$color ? props.$color : '#000' )};
    height: ${props => props.$height ? props.$height : '15rem'}
`

const HeroSection = ({ image, color, height }) => {
    return (
        <StyledHeroSection
            $image={image}
            $color={color}
            $height={height}
        >
        </StyledHeroSection>
    )
}

export default HeroSection