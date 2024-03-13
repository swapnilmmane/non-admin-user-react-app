// CreateNote.js
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_NOTE = gql`
  mutation CreateNote($title: String!, $description: String!) {
    createNote(data: { title: $title, description: $description }) {
      data {
        id,
        title,
        description
      }
      
    }
  }
`;

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [createNote] = useMutation(CREATE_NOTE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createNote({
        variables: { title, description }
      });
      console.log('Note created:', data.createNote);
      // Optionally, you can perform any action after the note is created
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <div>
      <h2>Create Note</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Create Note</button>
      </form>
    </div>
  );
};

export default CreateNote;
