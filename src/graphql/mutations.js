import { gql } from '@apollo/client';

export const createNote = gql`
  mutation CreateNote($data: NoteInput!) {
    createNote(data: $data) {
      data {
        id
        title
        description
      }
    }
  }
`;
