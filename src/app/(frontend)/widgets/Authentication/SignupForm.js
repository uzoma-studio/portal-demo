'use client';

import { useState } from 'react';

const SignupForm = ({ onClose, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
          });

          const data = await res.json();
          setMessage(data.message || data.error);
          setTimeout(() => { 
            data.user && setUser(data.user)
            onClose()
          }, 2000);
        } catch (error) {
          setMessage('Signup failed.');
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
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
            <button type="submit" className='default-button'>Sign Up</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default SignupForm;