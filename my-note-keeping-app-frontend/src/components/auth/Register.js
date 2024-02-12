// src/components/auth/Register.js
import React, { useState } from 'react';
import { Button, Container, Form, Header, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
    const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e, { name, value }) => setCredentials({ ...credentials, [name]: value });

    const handleSubmit = async () => {
        if (await register(credentials.username, credentials.email, credentials.password)) {
            navigate('/'); // Redirect after successful registration
        } else {
            alert('Failed to register');
        }
    };

    return (
        <Container>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>Register</Header>
            <Segment>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        label="Username"
                        type="text"
                        name="username"
                        placeholder="Choose a username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <Button type='submit' fluid primary>Register</Button>
                </Form>
            </Segment>
        </Container>
    );
};

export default Register;
