import React, { useEffect } from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import theme from '../services/muiTheme';

import App from '../scenes/App/index';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import useBackendApi from '../services/useBackendApi';


export default function AppPage(props) {
  const backendApiUrl = useBackendApi();
  // Check if user is logged in
  useEffect(() => {
    if (!localStorage.getItem('jwt')) {
      window.location = '/login/'
    }
  });

  // Create Apollo Graphql client
  const client = new ApolloClient({
    uri: `${backendApiUrl}/graphql`,
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