// src/components/notes/NoteForm.js
import React, { useState, useEffect } from 'react';
import { Button, Form, Segment, Container, Header } from 'semantic-ui-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const NoteForm = () => {
    const [note, setNote] = useState({ title: '', content: '' });
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams(); // For edit mode

    useEffect(() => {
        // If `id` is present, we're in edit mode and need to fetch the note to edit
        console.log(id);
        if (id) {
            const fetchNote = async () => {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${currentUser?.token}`,
                    },
                });
                const data = await response.json();
                setNote({ title: data.title, content: data.content });
            };
            fetchNote();
        }
    }, [id, currentUser]);

    const handleChange = (e, { name, value }) => {
        setNote(prevNote => ({
            ...prevNote,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const url = id ? `${process.env.REACT_APP_API_URL}/api/notes/${id}` : `${process.env.REACT_APP_API_URL}/api/notes`;
        const method = id ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser?.token}`,
                },
                body: JSON.stringify(note),
            });
            navigate('/notes');
        } catch (error) {
            console.error("Failed to submit note:", error);
        }
    };

    return (
        <Container>
            <Header as='h1' textAlign='center' style={{ margin: '20px 0' }}>

                {id ? 'Edit Note' : 'Create Note'}

            </Header>
            <Segment>
                <Form onSubmit={handleSubmit}>
                    <Form.Input
                        label="Title"
                        type="text"
                        name="title"
                        value={note.title}
                        onChange={handleChange}
                    />
                    <Form.TextArea
                        label="Content"
                        name="content"
                        value={note.content}
                        onChange={handleChange}
                    />
                    <Button type='submit' primary>{id ? 'Update Note' : 'Create Note'}</Button>
                </Form>
            </Segment>
        </Container>
    );
};

export default NoteForm;
