import 'reflect-metadata';
import Fastify from 'fastify';
import mercurius from 'mercurius';
import {buildSchema} from 'type-graphql';
import {createConnection, getConnection} from 'typeorm';
import path from 'path';
import dotenv from 'dotenv';
import UserResolvers from './resolvers/user';
import BlogPostResolvers from './resolvers/blogPost';
import User from './entities/User';
import BlogPost from './entities/BlogPost';
import {customAuthChecker} from './auth/customAuthChecker';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const main = async () => {
	const app = Fastify({logger: true});

	try {
		await createConnection({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: 5432,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PSWD,
			database: process.env.DB_NAME,
			// logging: true,
			migrations: [path.join(__dirname, './migrations/*')],
			entities: [User, BlogPost],
		});
		// await User.delete({})
		await getConnection().runMigrations();
		app.log.info('Database connection successful');
	} catch (err) {
		app.log.error('Database connection failed :' + err.message);
	}

	const schema = await buildSchema({
		resolvers: [UserResolvers, BlogPostResolvers],
		validate: false,
		authChecker: customAuthChecker
	});
	app.register(mercurius, {
		schema, graphiql: 'playground', path: '/graphql',
		context: (request) => {
			return {jwtToken: request.headers.authorization ? request.headers.authorization.split(' ')[1] : ''};
		}
	});
	const port: number = parseInt(process.env.port || '') || 4000;
	await app.listen({port: port});
};

main().catch(err => console.log(err));