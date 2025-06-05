'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupForm = ({ onClose, setUser, isAuthPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const router = useRouter()

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
          setTimeout(async() => {
            if(data.user){
              // Different behaviours depending on where the user is signing in from
              if(!isAuthPage){
                setUser(data.user);
                onClose();
              } else {
                router.push('/jumping')
              }
            }
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