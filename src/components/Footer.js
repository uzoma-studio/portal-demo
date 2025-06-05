import React, { useContext } from 'react'
import styled from 'styled-components'
import { SpaceContext } from '@/context/SpaceProvider'
import Navbar from './Navbar'
import NewsTicker from './NewsTicker'

const StyledFooter = styled.div`
    background: ${props => props.$theme?.style?.menu?.backgroundColor || '#ccc'};
    height: ${props => props.$height ? props.$height : '3.5rem'};
    position: fixed;
    bottom: 0;
    width: 100%;
    overflow: hidden;
`

/**
 * Footer component (very similar to Header, can they be squashed into one?)
 * 
 * @param {string} background - Background color or image
 * @param {string} height - Height of the header
 * @param {boolean} [showPagesNav=false] - Flag to show/hide pages navigation
 * @param {object} [pages=false] - Pages to be passed to the Navbar component
 * @returns {JSX.Element} Footer component
 */

// TODO: change folder structure of the project: folders = root-components (Footer, Header, Navbar, etc), site-widgets (NewsTicker, AuthButton), page-content-types (Blog, Shop)
// TODO: make the site softcodeable, meaning all content, styles and settings for root components like Footer, Header, Navbar, etc should be set on the CMS
const Footer = ({ background, height, pages, showPagesNav, children }) => {
    const context = useContext(SpaceContext)
    const theme = context.theme
    
    return (
    <StyledFooter
        $background={background}
        $height={height}
        $showPagesNav={showPagesNav}
    >
        { theme?.style?.menu?.showNewsTicker && <NewsTicker /> }
    </StyledFooter>
    )
}

export default Footer