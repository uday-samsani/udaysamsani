import 'reflect-metadata';
import Fastify from 'fastify';
import mercurius from 'mercurius';
import {buildSchema} from 'type-graphql';
import UserResolvers from './resolvers/user';
import {createConnection} from 'typeorm';

const main = async () => {
    const app = Fastify({logger: true});

    try{
        await createConnection();
        app.log.info("Database connection successful")
    } catch (err){
        app.log.error("Database connection failed :"+err.message)
    }

    const schema = await buildSchema({
        resolvers: [UserResolvers]
    });
    app.register(mercurius, {schema, graphiql: 'playground', path: '/graphql'});
    const port: number = parseInt(process.env.port || '') || 4000;
    await app.listen({port: port});
};

main().catch(err => console.log(err));