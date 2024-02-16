// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/user`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setCurrentUser(data);
                } else {
                    setCurrentUser(null);
                }
            } catch (error) {
                console.error("Failed to check if user is logged in", error);
                setCurrentUser(null);
            } finally {
                // set after two seconds
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
                // setLoading(false); // Set loading to false once the check is complete
            }
        };

        checkUserLoggedIn();
    }, []);

    // Adjusted login and register functions to match your setup
    // These will not directly manipulate the token storage but rely on server-side cookie management

    const login = async (email, password) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Important for cookies
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                setCurrentUser(data);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };


    const register = async (username, email, password) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Important for cookies
                body: JSON.stringify({ username, email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                setCurrentUser(data); // Update current user state based on response
                return true;
            } else {
                // Handle registration errors (e.g., user already exists)
                const errorData = await response.json();
                console.error("Registration failed:", errorData.msg);
                return false;
            }
        } catch (error) {
            console.error("Registration failed:", error);
            return false;
        }
    };
    const logout = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include', // Important for cookies
            });
            if (response.ok) {
                setCurrentUser(null);
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;
