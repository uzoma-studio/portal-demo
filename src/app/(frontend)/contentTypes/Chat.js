'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components'
import { globalConfig } from '../template-config';

import AuthButton from '@/app/(frontend)/widgets/Authentication/AuthButton'
import { useAuth } from '../context/AuthProvider';

const ChatWrapper = styled.div`

    font-family: ${globalConfig.style.bodyFont};

    .chat-container {

        .input-box-container {
            display: flex;
            position: absolute;
            bottom: 5%;
            width: 100%;
    
            input.chat-input {
                border: 2px solid #222;
                border-radius: 5px;
                padding: 2%;
                width: 70%;
            }
    
            .chat-button {
                text-align: center;
                display: block;
                width: 7.5%;
                margin: 0 1%;
                background-color: #222;
                color: #fff;
                border-radius: 5px;

                &:hover {
                    background-color: #fff;
                    border: 2px solid #222;
                    color: #222;
                }
            }
        }

    }
`

const Chat = ({ data }) => {
    const [messages, setMessages] = useState(data);
    const [message, setMessage] = useState('');
    const [buttonText, setButtonText] = useState('Send')
    const { user } = useAuth()

    const username = user ? user.username : 'Guest'

    const bottomRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when messages update
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    const sendMessage = async () => {
        if (!message.trim()) return;

        setButtonText('Sending...');

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: username, message }),
            });

            const newMessage = await res.json();
            setMessages((prev) => [...prev, newMessage]);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setButtonText('Send');
        }
    };

    return (
        <ChatWrapper>
            <div className='chat-container'>
                <ul style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {messages.map((msg) => (
                        <li key={msg.id}>
                            <strong>{msg.user}:</strong> {msg.message}
                        </li>
                    ))}
                    <div ref={bottomRef} />
                </ul>
                <div className='input-box-container'>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className='chat-input'
                    />
                    <button className='chat-button' onClick={sendMessage}>{user ? buttonText : `${buttonText} as Guest`}</button>
                    <AuthButton />
                </div>
            </div>
        </ChatWrapper>
    );
};

export default Chat;