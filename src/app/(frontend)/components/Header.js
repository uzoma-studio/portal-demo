import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../../../context'
import AuthButton from '../widgets/Authentication/AuthButton'
import UserProfile from '../widgets/Authentication/UserProfile'
import { useAuth } from '@/app/(frontend)/context/AuthProvider'
import JoinSpaceButton from '../widgets/Spaces/JoinSpaceButton'
import SpacesSidebar from '../widgets/Spaces/SpacesSidebar'
import Image from 'next/image'

const StyledHeader = styled.div`
    background: ${props => props.$theme?.style?.menu?.backgroundColor || 'inherit'};
    height: ${props => props.$theme?.style?.menu?.defaultHeight || 'inherit'};
    font-family: ${props => props.$theme?.style?.headerFont || 'inherit'};
    color: ${props => props.$theme?.style?.headerFontColor || 'inherit'};

    display: flex;
    padding: 0 2.5rem;
    justify-content: space-between;
    align-items: center;

    .site-title {
      margin-bottom: 0;
    }
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
    const context = useContext(AppContext)
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
                {/* <Image 
                    src="/logo.png" 
                    alt="Logo" 
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                    onClick={() => setIsSidebarOpen(true)}
                /> */}
                <h1 className='site-title'>{siteTitle}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {user ? <UserProfile /> : <AuthButton />}
                    <JoinSpaceButton spaceId={context.spaceId} theme={theme} />
                </div>
            </StyledHeader>
            <SpacesSidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />
        </>
    )
}

export default Header