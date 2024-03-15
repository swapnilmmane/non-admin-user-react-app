// graphql/client.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { fetchAuthSession } from 'aws-amplify/auth';

// Create an HTTP link
const httpLink = createHttpLink({
  uri: 'https://d2ioo4rh6ck8y0.cloudfront.net/cms/manage/en-US',
});

// Set up authentication context for the client
const authLink = setContext(async (_, { headers }) => {
  // Fetch the authentication session
  const { idToken } = (await fetchAuthSession()).tokens ?? {};

  // Return the headers with authentication token and additional headers
  return {
    headers: {
      ...headers,
      Authorization: idToken ? `Bearer ${idToken}` : '',
      'x-tenant': 'root', 
    },
  };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
