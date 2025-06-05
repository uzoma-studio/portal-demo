'use client'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import LoginForm from '../../../widgets/Authentication/LoginForm'
import SignupForm from '../../../widgets/Authentication/SignupForm'
import Image from 'next/image'

const StyledAuthPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f5f5f5;
    padding: 20px;
    position: relative;

    .logo-container {
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translateX(-50%);
    }

    .auth-container {
        background: white;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 20px;
        min-width: 300px;
        width: 35%;
        max-width: 500px;

        .modal-tabs {
            display: flex;
            justify-content: flex-start;
            margin: 1rem 0;

            button {
                margin-right: 1rem;
                color: #222;

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
                    border: 2px solid #222;
                    border-radius: 5px;
                    padding: 2%;
                    width: 100%;
                }

                input, button {
                    margin: .5rem 0;
                }
            }
        }
    }
`

const AuthPage = () => {
    const [formType, setFormType] = useState('login')

    return (
        <StyledAuthPage>
            <div className="logo-container">
                <Image 
                    src={'/logo.png'} 
                    width={70} 
                    height={70} 
                    alt='Portal logo - purple concentric circles' 
                    priority
                />
            </div>
            <div className="auth-container">
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

                <div className="modal-body">
                    {formType === 'login' ? <LoginForm isAuthPage={true} /> : <SignupForm isAuthPage={true} />}
                </div>
            </div>
        </StyledAuthPage>
    )
}

export default AuthPage