// src/components/notes/NotesList.js
import React, { useEffect, useState } from 'react';
import { Card, Container, Header, Segment, Loader, Button } from 'semantic-ui-react';
import NoteItem from './NoteItem'; // We will create this component next
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
    PlaceholderParagraph,
    PlaceholderLine,
    PlaceholderHeader,
    GridColumn,
    Grid,
    Placeholder,

} from 'semantic-ui-react'



const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes`, {
                    method: 'GET',
                    credentials: 'include', // Include credentials to ensure cookies are sent
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch notes.');
                }
                const data = await response.json();
                setNotes(data);
            } catch (error) {
                console.error("Failed to fetch notes:", error);
            } finally {
                setLoading(false); // Ensure loading is set to false in both success and failure cases
            }
        };

        fetchNotes();
    }, [currentUser]); // Dependency on currentUser is kept if needed for re-fetching upon login status changes



    return (
        <Container>
            <Header as='h2' textAlign='center' style={{ margin: '20px 0' }}>My Notes</Header>
            {/* // At the top of your return statement in NotesList */}
            <Button as={Link} to="/notes/new" primary>Create Note</Button>


            {loading ? (
                <Segment>
                    <Grid columns={3} stackable>
                        <GridColumn>
                            <Segment raised>
                                <Placeholder>
                                    <PlaceholderHeader image>
                                        <PlaceholderLine />
                                        <PlaceholderLine />
                                    </PlaceholderHeader>
                                    <PlaceholderParagraph>
                                        <PlaceholderLine length='medium' />
                                        <PlaceholderLine length='short' />
                                    </PlaceholderParagraph>
                                </Placeholder>
                            </Segment>
                        </GridColumn>

                        <GridColumn>
                            <Segment raised>
                                <Placeholder>
                                    <PlaceholderHeader image>
                                        <PlaceholderLine />
                                        <PlaceholderLine />
                                    </PlaceholderHeader>
                                    <PlaceholderParagraph>
                                        <PlaceholderLine length='medium' />
                                        <PlaceholderLine length='short' />
                                    </PlaceholderParagraph>
                                </Placeholder>
                            </Segment>
                        </GridColumn>

                        <GridColumn>
                            <Segment raised>
                                <Placeholder>
                                    <PlaceholderHeader image>
                                        <PlaceholderLine />
                                        <PlaceholderLine />
                                    </PlaceholderHeader>
                                    <PlaceholderParagraph>
                                        <PlaceholderLine length='medium' />
                                        <PlaceholderLine length='short' />
                                    </PlaceholderParagraph>
                                </Placeholder>
                            </Segment>
                        </GridColumn>
                    </Grid>
                </Segment>
            ) : (
                <Segment>
                    {notes.length === 0 ? (
                        <h1>No notes found.</h1>
                    ) : (
                        <Card.Group className="custom-card-group" stackable itemsPerRow={3} >
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
