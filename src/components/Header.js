import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useSpace } from '@/context/SpaceProvider'
import AuthButton from '../widgets/Authentication/AuthButton'
import UserProfile from '../widgets/Authentication/UserProfile'
import { useAuth } from '@/context/AuthProvider'
import JoinSpaceButton from '../widgets/Spaces/JoinSpaceButton'
import PagesSidebar from './PagesSidebar'

const StyledHamburger = styled.button`
    span {
        background-color: var(--body-text-color);
        transition: all 0.3s ease-in-out;
    }

    &:hover span {
        background-color: var(--menu-hover-color);
    }
`

const StyledHeader = styled.div`
    background: var(--menu-background);
    color: var(--body-text-color);
    font-family: var(--header-font);
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
    const { space, settings } = useSpace()
    const { siteTitle, theme } = settings
    const { user } = useAuth()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    
    return (
        <>
            <StyledHeader
                $background={background}
                $theme={theme}
                className="w-full z-50 flex items-center justify-between px-10 py-4"
                style={{ height: theme?.style?.menu?.defaultHeight || '3.5rem' }}
            >
                <StyledHamburger 
                    onClick={() => setIsSidebarOpen(true)}
                    $theme={theme}
                    className="bg-transparent border-none cursor-pointer p-2 flex flex-col justify-between w-8 h-7 z-10"
                >
                    <span className="block w-full h-0.5" />
                    <span className="block w-full h-0.5" />
                    <span className="block w-full h-0.5" />
                </StyledHamburger>
                <p className="uppercase text-2xl m-0">
                    {siteTitle}
                </p>
                <div className="flex items-center gap-4 z-10">
                    {user ? <UserProfile /> : <AuthButton />}
                    <JoinSpaceButton spaceId={space.id} theme={theme} />
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