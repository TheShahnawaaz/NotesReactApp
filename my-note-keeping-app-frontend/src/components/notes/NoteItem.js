// src/components/notes/NoteItem.js
import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
// Add to the existing NoteItem imports
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const NoteItem = ({ note }) => {

    // Inside NoteItem component, before return statement
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    // Placeholder functions for edit and delete actions
    const handleEdit = () => {
        console.log('Edit Note:', note.id);
    };

    const handleDelete = async (noteId) => { // Ensure noteId is passed as an argument

        console.log(noteId);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/${noteId}`, {
                method: 'DELETE',
                credentials: 'include', // Include credentials to ensure cookies are sent
            });

            if (!response.ok) {
                throw new Error('Failed to delete note.');
            }
            const data = await response.json();
            console.log(data);

            // // Optionally refresh the notes list after deletion
            // setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId));

            navigate("/");
            navigate("/notes"); // This might be redundant if you're already refreshing the list
        } catch (error) {
            console.error("Failed to delete note:", error);
        }
    };


    return (
        <Card>
            <Card.Content header={note.title} />
            <Card.Content description={note.content} />
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green' as={Link} to={`/notes/edit/${note._id}`}>
                        <Icon name='edit' /> Edit
                    </Button>
                    <Button basic color='red' onClick={() => handleDelete(note._id)}>

                        <Icon name='trash' /> Delete
                    </Button>
                </div>
            </Card.Content>
        </Card>
    );
};

export default NoteItem;
