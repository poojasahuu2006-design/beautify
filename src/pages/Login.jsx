import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import classes from './Login.module.css';
import { Sparkles } from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [statusMsg, setStatusMsg] = useState('');
    const { login } = useShop();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setStatusMsg('');

        if (!email || !password || (!isLogin && !name)) {
            setError('Please fill in all fields to enter the boutique.');
            return;
        }

        const endpoint = isLogin ? '/api/login' : '/api/signup';
        const payload = isLogin ? { email, password } : { name, email, password };

        try {
            // Live backend se connected!
            const res = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.success) {
                if (isLogin) {
                    login(email, password); // Unlock frontend UI
                    navigate('/');
                } else {
                    setIsLogin(true); // Switch to login screen after signup
                    setStatusMsg(data.message + " Please log in now.");
                }
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Cannot connect to server. Ensure backend is running!");
        }
    };

    return (
        <div className={classes.loginContainer}>
            <div className={classes.imageSection}>
                <img
                    src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="Luxury Beauty"
                    className={classes.bgImage}
                />
                <div className={classes.overlay}></div>
            </div>

            <div className={classes.formSection}>
                <div className={classes.formWrapper}>
                    <div className={classes.header}>
                        <img src="/logo.png" alt="Beautify Logo" className={classes.loginLogo} />
                        <h1 className={classes.brandTitle}>Beautify</h1>
                        <p className={classes.subtitle}>Welcome back to your ultimate beauty destination</p>
                    </div>

                    <form className={classes.form} onSubmit={handleSubmit}>
                        {error && <div className={classes.error} style={{ color: '#dc3545', background: '#ffe6e6', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{error}</div>}
                        {statusMsg && <div style={{ color: 'green', background: '#e6ffe6', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{statusMsg}</div>}

                        {!isLogin && (
                            <div className={classes.inputGroup}>
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Full Name"
                                    className={classes.input}
                                />
                            </div>
                        )}

                        <div className={classes.inputGroup}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className={classes.input}
                            />
                        </div>

                        <div className={classes.inputGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className={classes.input}
                            />
                        </div>

                        <div className={classes.options}>
                            <label className={classes.checkbox}>
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className={classes.forgot}>Forgot password?</a>
                        </div>

                        <button type="submit" className={classes.submitBtn}>
                            {isLogin ? 'Sign In to Continue' : 'Create Account'}
                        </button>

                        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <span 
                                style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 'bold' }} 
                                onClick={() => { setIsLogin(!isLogin); setError(''); setStatusMsg(''); }}
                            >
                                {isLogin ? "Sign Up" : "Sign In"}
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
