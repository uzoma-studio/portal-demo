// AuthModal.jsx
import { useState, useContext } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import styled from 'styled-components';
import CloseButton from '../../components/closeButton';
import { useSpace } from '@/context/SpaceProvider';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    z-index: 999;

    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 20px;
        min-width: 300px;
        width: 35%;
        display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
        z-index: 1000;
    }

    .modal-tabs {
        display: flex;
        justify-content: flex-start;
        margin: 1rem 0;

        button {
            margin-right: 1rem;

            &:hover, &.active {
                text-decoration: underline
            }
        }
    }

    .modal-body {
        form {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            input {
                border: 2px solid ${props => props.$theme?.style?.primaryColor || '#222'};
                border-radius: 5px;
                padding: 2%;
                width: 100%;
            }

            input, button {
                margin: .5rem 0;
            }

            button {
                padding: .5rem;
                background: ${props => props.$theme?.style?.primaryColor || '#222'};
                color: ${props => props.$theme?.style?.accentColor || '#fff'};
                border: 2px solid ${props => props.$theme?.style?.accentColor || '#fff'};
                border-radius: 5px;

                &:hover {
                    border: 2px solid ${props => props.$theme?.style?.primaryColor || '#222'};
                    color: ${props => props.$theme?.style?.primaryColor || '#222'};
                    background: ${props => props.$theme?.style?.accentColor || '#fff'};
                }
            }
        }
    }

    .modal-tabs, .modal-body {
        button {
            color: ${props => props.$theme?.style?.bodyTextColor || '#222'};
        }
    }
`;

const AuthModal = ({ isOpen, onClose, setUser }) => {
    const [formType, setFormType] = useState('login');
    const { settings } = useSpace()

    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={onClose} $isOpen={isOpen} $theme={settings.theme}>
            <div
                className="modal-content"
                onClick={e => e.stopPropagation()}
            >
                <div className="modal-header">
                    <CloseButton closeFn={onClose} position={{x: '90', y: '5'}} />
                </div>

                {/* Toggle buttons to switch forms */}
                <div className="modal-tabs">
                    <button
                        onClick={() => setFormType('login')}
                        className={formType === 'login' ? 'active' : ''}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setFormType('signup')}
                        className={formType === 'signup' ? 'active' : ''}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Render the appropriate form */}
                <div className="modal-body">
                    {formType === 'login' ? <LoginForm onClose={onClose} setUser={setUser} /> 
                                            : <SignupForm onClose={onClose} setUser={setUser} />}
                </div>
            </div>
        </ModalOverlay>
    );
};

export default AuthModal;