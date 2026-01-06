import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Layout: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="app-container">
            <nav className="navbar" style={{ backgroundColor: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', height: '64px', alignItems: 'center' }}>
                    <div className="flex">
                        <Link to="/home" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)', textDecoration: 'none' }}>
                            Growth Guide
                        </Link>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {user ? (
                            <>
                                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{user.email}</span>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#4b5563',
                                        cursor: 'pointer',
                                        fontSize: '1rem'
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={{ color: '#4b5563', textDecoration: 'none' }}>Login</Link>
                                <Link to="/signup" style={{ color: '#4b5563', textDecoration: 'none' }}>Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <main className="container" style={{ padding: '1.5rem 1rem' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
