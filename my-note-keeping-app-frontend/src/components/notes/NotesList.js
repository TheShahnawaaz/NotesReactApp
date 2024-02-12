// src/components/notes/NotesList.js
import React, { useEffect, useState } from 'react';
import { Card, Container, Header, Segment, Loader, Button } from 'semantic-ui-react';
import NoteItem from './NoteItem'; // We will create this component next
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';



const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes`, {
                    headers: {
                        Authorization: `Bearer ${currentUser?.token}`,
                    },
                });
                const data = await response.json();
                setNotes(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch notes:", error);
                setLoading(false);
            }
        };

        fetchNotes();
    }, [currentUser]);

    return (
        <Container>
            <Header as='h2' textAlign='center' style={{ margin: '20px 0' }}>My Notes</Header>
            {/* // At the top of your return statement in NotesList */}
            <Button as={Link} to="/notes/new" primary>Create Note</Button>


            {loading ? (
                <Segment>
                    <Loader active inline='centered' />
                </Segment>
            ) : (
                <Segment>
                    {notes.length === 0 ? (
                        <h1>No notes found.</h1>
                    ) : (
                        <Card.Group>
                            {notes.map(note => (
                                <NoteItem key={note.id} note={note} />
                            ))}
                        </Card.Group>
                    )}
                </Segment>
            )}
        </Container>
    );
};

export default NotesList;