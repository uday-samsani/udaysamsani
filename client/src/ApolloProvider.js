import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

const uploadLink = createUploadLink({
    uri:
        process.env.NODE_ENV === 'production'
            ? '/graphql'
            : 'http://192.168.1.5:5000/graphql',
});
const httpLink = createHttpLink({
    uri:
        process.env.NODE_ENV === 'production'
            ? '/graphql'
            : 'http://192.168.1.5:5000/graphql',
});

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: ApolloLink.from([authLink, uploadLink, httpLink]),
    cache: new InMemoryCache(),
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
