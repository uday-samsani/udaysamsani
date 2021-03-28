import 'reflect-metadata';
import Fastify from 'fastify';
import mercurius from 'mercurius';
import {buildSchema} from 'type-graphql';
import UserResolvers from './resolvers/user';
import {createConnection} from 'typeorm';
import User from './entities/User';
import * as path from 'path';

const main = async () => {
    const app = Fastify({logger: true});

    try{
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "0mega99@2018",
            database: "udaysamsani",
            logging: true,
            migrations: [path.join(__dirname, "./migrations/*")],
            entities: [User],
        });
        // await User.delete({})
        // await getConnection().runMigrations()
        app.log.info("Database connection successful")
    } catch (err){
        app.log.error("Database connection failed :"+err.message)
    }

    const schema = await buildSchema({
        resolvers: [UserResolvers],
        validate: false
    });
    app.register(mercurius, {schema, graphiql: 'playground', path: '/graphql'});
    const port: number = parseInt(process.env.port || '') || 4000;
    await app.listen({port: port});
};

main().catch(err => console.log(err));