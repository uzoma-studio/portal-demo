'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components'
import { globalConfig } from '../template-config';

const ChatWrapper = styled.div`

    font-family: ${globalConfig.style.bodyFont};

    .chat-container {

        .input-box-container {
            display: flex;
            position: absolute;
            bottom: 5%;
            width: 100%;
    
            input {
                border: 2px solid #222;
                border-radius: 5px;
                padding: 2%;
                width: 70%;
            }
    
            button {
                text-align: center;
                display: bloc;
                width: 15%;
                margin-left: 3.25%;
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
    const [user, setUser] = useState('Guest');

    const bottomRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when messages update
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
    if (!message.trim()) return;
    
    setButtonText('Sending...');
        
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, message }),
        });

        const newMessage = await res.json();
        setMessages((prev) => [...prev, newMessage]);
        setMessage('');
    
        setButtonText('Send');
    };

    return (
        <ChatWrapper>
            <h2>Chat</h2>
            <div className='chat-container'>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {messages.map((msg) => (
                        <div key={msg.id}>
                            <strong>{msg.user}:</strong> {msg.message}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
                <div className='input-box-container'>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={sendMessage}>{buttonText}</button>
                </div>
            </div>
        </ChatWrapper>
    );
};

export default Chat;