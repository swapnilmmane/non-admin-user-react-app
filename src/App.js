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

import { fetchAuthSession } from 'aws-amplify/auth';

import NoteList from './NoteList';
import CreateNote from './CreateNote';

import { signUp } from 'aws-amplify/auth';

const httpLink = createHttpLink({
  uri: 'https://d2ioo4rh6ck8y0.cloudfront.net/cms/manage/en-US'
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
    <Authenticator signUpAttributes={[
      'email',
      'family_name',
      'given_name'
    ]}


    /* Passing the addition wby_website_group attribute to the signUp method
     * We use this attribute to assign the user to the website-users group
     * The website-users group has the necessary permissions to access the website in Webiny side
     */
    services={{
      async handleSignUp(formData) {
        const { options, username, password } = formData;
        options.userAttributes["custom:wby_website_group"] = 'website-users';
        const res = await signUp({
          username,
          password,
          options
        });
        return res;
      },
    }}
    >
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>

          <ApolloProvider client={client}>
            <div>
              <h2>Create Note</h2>
              <CreateNote />

              <h2>My Notes</h2>
              <NoteList />
            </div>
          </ApolloProvider>

        </main>
      )}
    </Authenticator>
  );
};

export default App;