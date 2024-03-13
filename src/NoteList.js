// NoteList.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_NOTES = gql`
  query {
    listNotes {
        data {
          id,
          title,
          description
        }
      }
  }
`;

const NoteList = () => {
  const { loading, error, data } = useQuery(GET_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {data.listNotes.data.map(note => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
