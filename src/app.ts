import * as express from 'express';
import * as http from 'http';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import Config from './config';
import { log } from './utils/winston-logger';
import ApplicationConfig from './application.routes';

const mongoUrl: string = Config.mongodb.url;
const PORT: number | string = Config.server.port;

class App {
	public app: express.Application;
	public server:any

	constructor() {
		this.app = express();
		this.server = http.createServer(this.app)
		this.server.listen(PORT, () => {
			log.info('Server is running on port ' + PORT);
		});
		this.mongoSetup();
		this.config();
	}

	private config(): void {
		this.app.use(bodyParser.json({ extends: true, limit: '50mb' }));

		ApplicationConfig.registerRoute(this.app);
		this.app.use(express.static('public'));

		/**
		 * Catch 404:not found routes
		 */
		this.app.use((req, res, next) => {
			const err: any = new Error('Not Found');
			err.status = 404;
			next(err);
		});
	}

	/**
	 * Establishes MongoDB connection
	 */
	private mongoSetup(): void {
		mongoose.connection.on('connected', () => {
			log.info('DATABASE - Connected');
		});

		mongoose.connection.on('error', (err) => {
			log.error(`DATABASE - Error:${err}`);
		});

		mongoose.connection.on('disconnected', () => {
			log.warn('DATABASE - disconnected  Retrying....');
		});

		const dbOptions = {
			maxPoolSize: 5,
			useNewUrlParser: true,
		};
		mongoose.connect(mongoUrl, dbOptions);
	}
}
export default new App().server;
