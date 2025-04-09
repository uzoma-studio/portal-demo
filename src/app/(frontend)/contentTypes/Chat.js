'use client';

import { useState, useRef, useEffect } from 'react';

const Chat = ({ data }) => {
    const [messages, setMessages] = useState(data);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState('Guest');

    const bottomRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when messages update
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!message.trim()) return;
        
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, message }),
        });

        const newMessage = await res.json();
        setMessages((prev) => [...prev, newMessage]);
        setMessage('');
    };

    return (
        <div>
            <h2>Chat</h2>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {messages.map((msg) => (
                    <div key={msg.id}>
                        <strong>{msg.user}:</strong> {msg.message}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
            <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;