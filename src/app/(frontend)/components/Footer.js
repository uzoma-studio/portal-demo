import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../../../context'
import Navbar from './Navbar'

const StyledFooter = styled.div`
    background: ${props => props.$image ? props.$image : ( props.$color ? props.$color : '#ecf0f1' )};
    // height: ${props => props.$height ? props.$height : '3.5rem'};

    display: flex;
    flex-direction: column;
    padding: 0 2.5rem;
    justify-content: center;
    align-items: center;
    font-family: monospace;
    position: absolute;
    bottom: 0;
    width: 100%;
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
    const context = useContext(AppContext)
    const siteSettings = context.site
    const { siteTitle } = siteSettings
    
    return (
    <StyledFooter
        $background={background}
        $height={height}
        $showPagesNav={showPagesNav}
    >
        <h3>{ siteTitle }</h3>
        {children}
        { showPagesNav && <Navbar pages={pages} />}
    </StyledFooter>
    )
}

export default Footer