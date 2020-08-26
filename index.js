const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const favicon = require('serve-favicon');

const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            context: ({ req }) => ({ req }),
        });

        const app = express();
        server.applyMiddleware({ app, path: '/graphql' });
        app.use(favicon(path.join(__dirname, 'build/public', 'favicon.ico')));
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static('client/build'));
            app.get('*', (req, res) => {
                res.sendFile(
                    path.join(__dirname, 'client', 'build', 'index.html')
                );
            });
        }
        await app.listen({ port: PORT });
        console.log('🚀 Server ready at ' + server.graphqlPath);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
startServer();
