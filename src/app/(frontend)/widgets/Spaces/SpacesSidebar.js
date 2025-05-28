import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/app/(frontend)/context/AuthProvider'

const StyledSidebar = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 280px;
    background: white;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
    transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
    z-index: 1000;
    padding: 1rem;
`

const StyledOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    opacity: ${props => props.$isOpen ? '1' : '0'};
    visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
    transition: opacity 0.3s ease;
    z-index: 999;
`

const StyledLogo = styled.div`
    cursor: pointer;
    padding: 0.5rem;
    margin-bottom: 2rem;
`

const SpaceList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`

const SpaceItem = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border-radius: 4px;
    text-decoration: none;
    color: inherit;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f5f5f5;
    }

    &.active {
        background-color: #e9ecef;
    }
`

const RoleTag = styled.span`
    background: ${props => props.$role === 'owner' ? '#dc3545' : '#6c757d'};
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    font-size: 0.8rem;
    margin-left: 0.5rem;
`

const SpacesSidebar = ({ isOpen, onClose }) => {
    const { user } = useAuth()
    const [spaces, setSpaces] = useState([])

    useEffect(() => {
        const fetchSpaces = async () => {
            if (!user) return

            try {
                const response = await fetch('/api/spaces/user-spaces', {
                    credentials: 'include',
                })
                if (response.ok) {
                    const data = await response.json()
                    setSpaces(data.spaces)
                }
            } catch (error) {
                console.error('Error fetching spaces:', error)
            }
        }

        if (isOpen) {
            fetchSpaces()
        }
    }, [isOpen, user])

    return (
        <>
            <StyledOverlay $isOpen={isOpen} onClick={onClose} />
            <StyledSidebar $isOpen={isOpen}>
                <StyledLogo>
                    <Image 
                        src="/logo.png" 
                        alt="Logo" 
                        width={40} 
                        height={40} 
                        priority
                    />
                </StyledLogo>
                <SpaceList>
                    <h3>Your Spaces</h3>
                    {spaces.map(space => (
                        <SpaceItem 
                            key={space.id} 
                            href={`/spaces/${space.id}`}
                            className={space.id === window.location.pathname.split('/')[2] ? 'active' : ''}
                        >
                            <p>{space.name}</p>
                            {(space.role === 'admin' || space.role === 'owner') && (
                                <RoleTag $role={space.role}>
                                    {space.role === 'owner' ? 'Owner' : 'Admin'}
                                </RoleTag>
                            )}
                        </SpaceItem>
                    ))}
                </SpaceList>
            </StyledSidebar>
        </>
    )
}

export default SpacesSidebar 