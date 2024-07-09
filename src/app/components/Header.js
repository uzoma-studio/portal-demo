import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../../context'
import Navbar from './Navbar'

const StyledHeader = styled.div`
    background: ${props => props.$image ? props.$image : ( props.$color ? props.$color : '#ecf0f1' )};
    // height: ${props => props.$height ? props.$height : '3.5rem'};

    display: flex;
    flex-direction: column;
    padding: 0 2.5rem;
    justify-content: center;
    align-items: center;
`

/**
 * TODO - imagine if I wanted to give my header the font that I've specified in my template's template config...
 * It would be cool to have a function or sth that maps styles for root components to styles defined in template config
 * Another option might just be to have the style attributes in template files not be template-specific but apply to the
 * whole site...
 * 
 */

/**
 * Header component
 * 
 * @param {string} background - Background color or image
 * @param {string} height - Height of the header
 * @param {boolean} [showPagesNav=false] - Flag to show/hide pages navigation
 * @param {object} [pages=false] - Pages to be passed to the Navbar component
 * @returns {JSX.Element} Header component
 */
const Header = ({ background, height, pages, showPagesNav }) => {

    const context = useContext(AppContext)
    const { SiteTitle } = context
  return (
    <StyledHeader
        $background={background}
        $height={height}
        $showPagesNav={showPagesNav}
    >
        <h1>{ SiteTitle }</h1>
        { showPagesNav && <Navbar pages={pages} />}
    </StyledHeader>
  )
}

export default Header