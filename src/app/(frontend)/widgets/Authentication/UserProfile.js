import React from 'react'
import { useAuth } from '@/app/(frontend)/context/AuthProvider';
import styled from 'styled-components';

const StyledProfile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const UserProfile = () => {

    const { user, setUser } = useAuth();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'GET', credentials: 'include' });
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <StyledProfile>
            <p>{user.username}</p>
            <button onClick={handleLogout}>Logout</button>
        </StyledProfile>
    )
}

export default UserProfile