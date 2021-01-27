import React, { useEffect } from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from '#src/services/muiTheme';

import App from '#src/scenes/App/index';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import BACKEND_API_URL from "#src/services/BACKEND_API_URL";


export default function AppPage(props) {
  // Check if user is logged in
  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      window.location = '/login/'
    }
  });

  // Create Apollo Graphql client
  const client = new ApolloClient({
    uri: `${BACKEND_API_URL}/graphql`,
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  });

  return <>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App></App>
      </ThemeProvider>
    </ApolloProvider>

  </>
}