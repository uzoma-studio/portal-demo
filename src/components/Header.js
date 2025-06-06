import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { SpaceContext } from '@/context/SpaceProvider'
import AuthButton from '../widgets/Authentication/AuthButton'
import UserProfile from '../widgets/Authentication/UserProfile'
import { useAuth } from '@/context/AuthProvider'
import JoinSpaceButton from '../widgets/Spaces/JoinSpaceButton'
import PagesSidebar from './PagesSidebar'

const StyledHamburger = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 2rem;
    height: 1.75rem;
    z-index: 10;

    span {
        display: block;
        width: 100%;
        height: 2px;
        background-color: ${props => props.$theme?.style?.bodyTextColor || '#222'};
        transition: all 0.3s ease-in-out;
    }

    &:hover span {
        background-color: ${props => props.$theme?.style?.menu?.hoverColor || '#666'};
    }
`

const StyledHeader = styled.div`
    background: ${props => props.$theme?.style?.menu?.backgroundColor || '#ccc'};
    height: ${props => props.$theme?.style?.menu?.defaultHeight || 'inherit'};
    font-family: ${props => props.$theme?.style?.headerFont || 'inherit'};
    color: ${props => props.$theme?.style?.bodyTextColor || 'inherit'};

    display: flex;
    padding: 0 2.5rem;
    justify-content: space-between;
    align-items: center;

    .site-title {
      margin-bottom: 0;
    }

    position: fixed;
    width: 100%;
    z-index: 99;
`

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
    const context = useContext(SpaceContext)
    const siteSettings = context.site
    const theme = context.theme
    const { siteTitle } = siteSettings
    const { user } = useAuth()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    
    return (
        <>
            <StyledHeader
                $background={background}
                $height={height}
                $showPagesNav={showPagesNav}
                $theme={theme}
            >
                <StyledHamburger 
                    onClick={() => setIsSidebarOpen(true)}
                    $theme={theme}
                >
                    <span />
                    <span />
                    <span />
                </StyledHamburger>
                <p style={{textTransform: 'uppercase', fontSize: '1.75rem', color: '#222'}}>
                    {siteTitle}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 10 }}>
                    {user ? <UserProfile /> : <AuthButton />}
                    <JoinSpaceButton spaceId={context.spaceId} theme={theme} />
                </div>
            </StyledHeader>
            <PagesSidebar 
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                pages={pages}
                theme={theme}
            />
        </>
    )
}

export default Header