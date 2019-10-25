const { ApolloServer } = require('apollo-server');

// const typeDefs = require('./graphql');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req })
});

const startServer = async () => {
	try {
		await connectDB();
		await server.listen({ port: 5000 });
		console.log('🚀  Server ready at localhost:5000/');
	} catch (error) {
		console.log(error.msg);
		process.exit(1);
	}
};
startServer();
