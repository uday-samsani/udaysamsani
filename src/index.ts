import 'reflect-metadata';
import Fastify from 'fastify';
import mercurius from 'mercurius';
import {buildSchema} from 'type-graphql';
import {createConnection} from 'typeorm';
import path from 'path';
import dotenv from 'dotenv';

// Models
import User from './entities/User';
import BlogPost from './entities/BlogPost';
import Role from './entities/Role';

//  Controllers
import UserResolvers from './api/controllers/user';
import BlogPostResolvers from './api/controllers/blogPost';

import {customAuthChecker} from './auth/customAuthChecker';
import {Context} from './types';
import RolesResolvers from './api/controllers/role';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const main = async () => {
	const app = Fastify({logger: false});

	app.register(require('fastify-jwt'), {
		secret: 'supersecret'
	})

	try {
		await createConnection({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: 5432,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PSWD,
			database: process.env.DB_NAME,
			logging: false,
			migrations: [path.join(__dirname,'api', './migrations/*')],
			entities: [User, BlogPost, Role],
		});
		app.log.info('Database connection successful');
	} catch (err) {
		app.log.error('Database connection failed :' + err.message);
	}

	const schema = await buildSchema({
		resolvers: [UserResolvers, BlogPostResolvers, RolesResolvers],
		validate: false,
		authChecker: customAuthChecker
	});
	app.register(mercurius, {
		schema, graphiql: 'playground', path: '/graphql',
		context: (request): Context => {
			return {
				jwtToken: request.headers.authorization ? request.headers.authorization.split(' ')[1] : '',
				log: request.log,
				request
			};
		}
	});
	const port: number = parseInt(process.env.port || '') || 4000;
	await app.listen({port: port});
};

main().catch(err => console.log(err));