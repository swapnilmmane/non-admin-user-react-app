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
        </main>
      )}
    </Authenticator>
  );
};

export default App;