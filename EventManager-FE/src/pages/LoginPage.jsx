import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook do przekierowywania

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // Prosta walidacja formularza
        if (!email || !password) {
            setError('Both fields are required');
            return;
        }

        const loginData = {
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();

                // Zapisz token JWT do localStorage
                localStorage.setItem('access_token', data.access_token);

                // Przekierowanie na stronę dashboard
                navigate('/dashboard');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="btn">Log In</button>
            </form>
        </div>
    );
};

export default LoginPage;