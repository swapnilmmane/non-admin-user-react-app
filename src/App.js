import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
  Authenticator
} from "@aws-amplify/ui-react";

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink  } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import NoteList from './NoteList';
import { fetchAuthSession } from 'aws-amplify/auth';

const httpLink = createHttpLink({
  uri: 'https://d2ioo4rh6ck8y0.cloudfront.net/cms/read/en-US'
});

const authLink = setContext(async (_, { headers }) => {
    const { idToken } = (await fetchAuthSession()).tokens ?? {};

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${idToken}`,
      'x-tenant': 'root'
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = ({ signOut }) => {


  return (
    <Authenticator initialState="signUp" signUpAttributes={[
      'email',
      'family_name',
      'given_name'
    ]}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>

          <ApolloProvider client={client}>
            <div>
              <h1>My Notes App</h1>
              <NoteList />
            </div>
          </ApolloProvider>

        </main>
      )}
    </Authenticator>
  );
};

export default App;