import AutoLoad from '@fastify/autoload'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import 'dotenv/config'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
// import AdminJSFastify from '@adminjs/fastify'
// import AdminJS, { ComponentLoader } from 'adminjs'
// import * as AdminJSMongoose from '@adminjs/mongoose'
// import MongoStore from 'connect-mongo'
// import HistPlace from './models/histPlace.model.js';
// import Comment from './models/comment.model.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const options = {}

const connectMongoOptions = {
	keepAlive: true,
	useUnifiedTopology: true,
	useNewUrlParser: true,
}

// const runAdminJs = async function (fastify)  {
// 	AdminJS.registerAdapter({
// 		Resource: AdminJSMongoose.Resource,
// 		Database: AdminJSMongoose.Database,
// 	})


// 	const DEFAULT_ADMIN = {
// 		email: 'admin@example.com',
// 		password: '123456',
// 	}
// 	const authenticate = async (email, password) => {
// 		if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
// 			return Promise.resolve(DEFAULT_ADMIN)
// 		}
// 		return null
// 	}

// 	const cookieSecret = 'sieL67H7GbkzJ4XCoH0IHcmO1hGBSiG5'
// 	const admin = new AdminJS({
// 		rootPath: '/admin',
// 		resources: [HistPlace, Comment],
// 	});

// 	const sessionStore =  MongoStore.create({
// 		client: mongoose.connection.getClient(),
// 		collectionName: 'sessions',
// 		stringify: false,
// 		autoRemove: 'interval',
// 		autoRemoveInterval: 1
// 	});

// 	await AdminJSFastify.buildAuthenticatedRouter(
// 		admin,
// 		{
// 			authenticate,
// 			cookiePassword: cookieSecret,
// 			cookieName: 'adminjs',
// 		},
// 		fastify,
// 		{
// 			store: sessionStore,
// 			saveUninitialized: true,
// 			secret: cookieSecret,
// 			cookie: {
// 				httpOnly: false,
// 				secure: false,
// 			},
// 		}
// 	)
// }

export default async function (fastify, opts) {

	try {
		await mongoose.connect(
			process.env.API_MONGODB_URI,
			connectMongoOptions
		)
	} catch (e) {
		console.error(e)
	}

	await fastify.register(cors, {
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'PATCH'],
	})

	fastify.register(multipart, {attachFieldsToBody: true})
	// await runAdminJs(fastify)  

	fastify.register(fastifyStatic, {
		root: path.join(__dirname, 'uploads', 'images'),
	})

	fastify.get('/uploads/images/:imageName', (req, reply) => {
		reply.sendFile(req.params.imageName)
	})

	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'plugins'),
		options: Object.assign({}, opts),
	})

	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'routes'),
		options: Object.assign({}, opts),
	})
}
