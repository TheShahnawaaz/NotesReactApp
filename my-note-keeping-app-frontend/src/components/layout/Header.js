// src/components/layout/Header.js
import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, Container, Icon } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('');

    useEffect(() => {
        // Extract the active item from the URL location
        const pathname = location.pathname;
        const activeItem = pathname.split('/')[1] || 'home';
        console.log(activeItem);
        setActiveItem(activeItem);
    }, [location]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Container textAlign='center' style={{ margin: '20px 0' }}>

            <Menu size='massive'>
                <MenuItem
                    as={Link}
                    to="/"
                    name='home'
                    active={activeItem === 'home'}
                >
                    <Icon name='home' />
                    Home
                </MenuItem>
                {currentUser ? (
                    <>
                        <MenuItem
                            as={Link}
                            to="/notes"
                            name='notes'
                            active={activeItem === 'notes'}
                        >
                            <Icon name='sticky note' />
                            Notes
                        </MenuItem>
                        <MenuItem
                            position='right'
                            onClick={handleLogout}
                        >
                            <Icon name='sign-out' />
                            Logout
                        </MenuItem>
                    </>
                ) : (
                    <>
                        <Menu.Menu position='right'>
                            <MenuItem
                                position='right'
                                as={Link}
                                to="/login"
                                name='login'
                                active={activeItem === 'login'}
                            >
                                <Icon name='sign-in' />
                                Login
                            </MenuItem>
                            <MenuItem
                                position='right'
                                as={Link}
                                to="/register"
                                name='register'
                                active={activeItem === 'register'}
                            >
                                <Icon name='signup' />
                                Register
                            </MenuItem>
                        </Menu.Menu>
                    </>
                )}
            </Menu>
        </Container>
    );
};

export default Header;