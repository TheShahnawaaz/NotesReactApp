// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, []);

    const login = async (email, password) => {
        try {
            console.log(process.env.REACT_APP_API_URL);
            console.log(`${process.env.REACT_APP_API_URL}/api/auth/login`);
            console.log(email, password);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, { // Notice the backticks here
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log(data);
            if (data.token) {
                localStorage.setItem("user", JSON.stringify(data));
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
            console.log(`${process.env.REACT_APP_API_URL}/api/auth/register`);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, { // And here
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("user", JSON.stringify(data));
                setCurrentUser(data);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Registration failed:", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
