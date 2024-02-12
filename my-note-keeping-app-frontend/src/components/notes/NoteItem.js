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

    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/${note._id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`,
                },
            });

            const data = await response.json();
            console.log(data);

            navigate("/");
            navigate("/notes");
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
                    <Button basic color='red' onClick={handleDelete}>
                        <Icon name='trash' /> Delete
                    </Button>
                </div>
            </Card.Content>
        </Card>
    );
};

export default NoteItem;
