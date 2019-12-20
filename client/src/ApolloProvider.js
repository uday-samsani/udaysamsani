import React from 'react';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';

const httpLink = createHttpLink({
	uri: 'http://192.168.1.9:5000/'
});
const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
});

export default (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
