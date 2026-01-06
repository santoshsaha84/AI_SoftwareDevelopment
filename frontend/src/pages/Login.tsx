import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { login } = useAuth(); // Added call to useAuth hook

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Using Identity API endpoint
            await api.post('/auth/login', { email, password });
            login(email); // Call login function upon successful authentication
            // On success, redirect to home. Note: Identity cookie is set automatically.
            navigate('/home');
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem 1rem' }}>
            <div className="card" style={{ maxWidth: '28rem', width: '100%', padding: '2rem' }}>
                <div>
                    <h2 style={{ textAlign: 'center', fontSize: '1.875rem', fontWeight: '800', marginBottom: '2rem' }}>Sign in to your account</h2>
                </div>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleLogin}>
                    <div>
                        <div>
                            <label htmlFor="email-address" style={{ display: 'none' }}>Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="input-field"
                                placeholder="Email address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <label htmlFor="password" style={{ display: 'none' }}>Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="input-field"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn" style={{ width: '100%' }}>
                            Sign in
                        </button>
                    </div>
                    <div style={{ position: 'relative', textAlign: 'center', margin: '1rem 0' }}>
                        <hr style={{ border: '0', borderTop: '1px solid #e5e7eb' }} />
                        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '0 0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>Or continue with</span>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#fff', color: '#374151', border: '1px solid #d1d5db' }}
                            onClick={() => window.location.href = '/api/auth/external-login?provider=Google'}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                    </div>
                </form>
                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: '500' }}>Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
