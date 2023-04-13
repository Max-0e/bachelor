import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Prototype API',
			version: '1.0.0',
			description:
				'This is a CRUD API application made with Express for the prototype of the Software developed for the bachelor thesis "Konzeption und Entwicklung eines Systems zur softwaregestützten Dokumentation von Unternehmensstrukturen für automatisierte Fortschrittsmessung und Werteorientierung"',
			contact: {
				name: 'Max Oedinger',
				url: 'https://116.203.140.167.nip.io/#/home',
				email: 'maximilian.oedinger@hsrw.org',
			},
		},
		servers: [
			{
				url: 'http://localhost:3000/api',
			},
			{
				url: 'https://116.203.140.167.nip.io/api',
			},
		],
	},
	apis: [
		// for development
		'./src/router/*.ts',
		'./src/router/base/*.ts',
		'./src/interfaces/*.ts',
		'./src/interfaces/dtos/*.ts',
		'./src/interfaces/base/*.ts',
		// for production
		'./router/*.js',
		'./router/base/*.js',
		'./interfaces/*.js',
		'./interfaces/dtos/*.js',
		'./interfaces/base/*.js',
	],
};