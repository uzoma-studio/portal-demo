'use client';

import { useState } from 'react';

const LoginForm = ({ onClose, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
          });
          const data = await res.json();

          setMessage(data.message || data.error);
          setTimeout(() => { 
            data.user && setUser(data.user)
            onClose()
          }, 2000);
        } catch (error) {
          setMessage('Login failed.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" className='default-button'>Log In</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default LoginForm;