// src/components/auth/Login.js
import React, { useState } from 'react';
import { Button, Container, Form, Header, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e, { name, value }) => setCredentials({ ...credentials, [name]: value });

    const handleSubmit = async () => {
        if (await login(credentials.email, credentials.password)) {
            navigate('/'); // Redirect to home or notes page after login
        } else {
            alert('Failed to log in');
        }
    };

    return (
        <Container>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>Login</Header>

            <Segment>
                <Form onSubmit={handleSubmit}>
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
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <Button type='submit' fluid primary>Login</Button>
                </Form>
            </Segment>
        </Container >
    );
};

export default Login;
