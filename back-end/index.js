import 'dotenv/config.js';
import express from 'express'
import cors from 'cors'
import ServerlessHttp from 'serverless-http';
import { retrieveAirportInfo } from './controllers/airport.js';
import { retrieveMetar } from './controllers/metar.js';
import { retrieveTAF } from './controllers/taf.js';

const app = express();
const port = process.env.PORT ?? 3000;

if (process.env.NODE_ENV === 'development') {
	app.use(cors());
} else {
	app.use(cors({
		origin: 'https://wx.braedenkilburn.com',
	}));
}

app.get('/airport/:icao', retrieveAirportInfo);
app.get('/metar/:icao', retrieveMetar);
app.get('/taf/:icao', retrieveTAF);

if (process.env.NODE_ENV === 'development') {
	app.listen(port, () => {
		console.log(`🚀 App listening on port ${port}`)
	})
}

export const handler = ServerlessHttp(app);