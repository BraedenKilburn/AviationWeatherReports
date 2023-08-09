import 'dotenv/config.js';
import express from 'express'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import { retrieveAirportInfo } from './controllers/airport.js';
import { retrieveMetar } from './controllers/metar.js';
import { retrieveTAF } from './controllers/taf.js';

const app = express();
const port = process.env.PORT;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 30, // Limit each IP to 30 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);
app.use(cors())

app.get('/api/airport/:icao', retrieveAirportInfo);
app.get('/api/metar/:icao', retrieveMetar);
app.get('/api/taf/:icao', retrieveTAF);

app.listen(port, () => {
  console.log(`🚀 App listening on port ${port}`)
})