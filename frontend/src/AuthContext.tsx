import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './services/api';

interface User {
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        // In a real app, we might call an endpoint like /api/auth/manage/info
        const checkAuth = async () => {
            try {
                const response = await api.get('/auth/manage/info');
                if (response.data && response.data.email) {
                    setUser({ email: response.data.email });
                }
            } catch (error) {
                // Not logged in or error
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = (email: string) => setUser({ email });
    const logout = async () => {
        try {
            // Depending on how backend handles logout (e.g., cookie clearing)
            // If it's a cookie-based auth, we might need a logout endpoint
            // For now, just clear local state
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
