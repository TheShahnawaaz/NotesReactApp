// src/components/Home.js
import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ensure this path matches your project structure

const Home = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login after logging out
    };

    return (
        <Container text style={{ marginTop: '2em' }}>
            <Header as='h1' textAlign='center'>Welcome to the Note Keeping App</Header>
            {currentUser ? (
                <div style={{ textAlign: 'center', marginTop: '2em' }}>
                    <Header as='h2'>Hello, {currentUser.username || 'User'}!</Header>
                    <Button size='large' as={Link} to='/notes' primary>View My Notes</Button>
                    <Button size='large' onClick={handleLogout} secondary style={{ marginLeft: '1em' }}>Logout</Button>
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '2em' }}>
                    <Button size='large' as={Link} to='/login' primary>Login</Button>
                    <Button size='large' as={Link} to='/register' secondary style={{ marginLeft: '1em' }}>Register</Button>
                </div>
            )}
        </Container>
    );
};

export default Home;
