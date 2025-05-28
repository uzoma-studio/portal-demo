import React, { useState } from 'react'
import { useAuth } from '@/app/(frontend)/context/AuthProvider';
import styled from 'styled-components';
import { logoutUser } from '@/app/(frontend)/utils/auth';

const StyledProfile = styled.div`
    position: relative;
    cursor: pointer;
`

const Avatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${props => props.$theme?.style?.menu?.avatarBackground || '#ddd'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.$theme?.style?.menu?.avatarColor || '#333'};
    font-weight: bold;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const Modal = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 1rem;
    min-width: 200px;
    z-index: 1000;
`

const ModalItem = styled.div`
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
    
    &:last-child {
        border-bottom: none;
    }

    &.logout {
        cursor: pointer;
        color: #ff4444;
        
        &:hover {
            text-decoration: underline;
        }

        &.loading {
            cursor: not-allowed;
            opacity: 0.7;
        }
    }
`

const UserProfile = () => {
    const { user, setUser } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        if (isLoggingOut) return; // Prevent multiple clicks
        
        setIsLoggingOut(true);
        const success = await logoutUser();
        if (success) {
            setUser(null);
            setShowModal(false);
        }
        setIsLoggingOut(false);
    };

    const getInitials = (username) => {
        return username
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <StyledProfile>
            <Avatar 
                onClick={() => setShowModal(!showModal)}
                $theme={user?.theme}
            >
                {user?.avatar ? (
                    <img src={user.avatar} alt={user.username} />
                ) : (
                    getInitials(user.username)
                )}
            </Avatar>
            {showModal && (
                <Modal>
                    <ModalItem>
                        <strong>Username:</strong> {user.username}
                    </ModalItem>
                    <ModalItem>
                        <strong>Email:</strong> {user.email}
                    </ModalItem>
                    <ModalItem 
                        className={`logout ${isLoggingOut ? 'loading' : ''}`} 
                        onClick={handleLogout}
                    >
                        {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </ModalItem>
                </Modal>
            )}
        </StyledProfile>
    )
}

export default UserProfile