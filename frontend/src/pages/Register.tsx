import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            // Using Identity API endpoint /api/auth/register
            await api.post('/auth/register', { email, password });
            alert('Registration successful! Please sign in.');
            navigate('/login');
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem 1rem' }}>
            <div className="card" style={{ maxWidth: '28rem', width: '100%', padding: '2rem' }}>
                <div>
                    <h2 style={{ textAlign: 'center', fontSize: '1.875rem', fontWeight: '800', marginBottom: '2rem' }}>Create an account</h2>
                </div>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleRegister}>
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
                                autoComplete="new-password"
                                required
                                className="input-field"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <label htmlFor="confirm-password" style={{ display: 'none' }}>Confirm Password</label>
                            <input
                                id="confirm-password"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="input-field"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn" style={{ width: '100%' }}>
                            Sign up
                        </button>
                    </div>
                </form>
                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '500' }}>Sign in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
