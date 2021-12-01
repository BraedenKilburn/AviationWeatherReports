const express = require('express');
const { MongoClient } = require('mongodb');
const axios = require('axios');

const PORT = 3000;
const key = '/?x-api-key=6d49d388dad844158755caf13c';
const url = 'https://api.checkwx.com';

const app = express();

// MongoDB Connection Path
let connectionString = `mongodb://localhost:27017/weather`

let db;
let airports;
let metars;
let tafs;

// Connect to our MongoDB
MongoClient.connect(
    connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async function (err, client) {
        if (err) 
            console.log(err);
        else
        {
            db = client.db();
			airports = db.collection('airport');
			metars = db.collection('metar');
			tafs = db.collection('taf');

			// If we've specified our indexes previously, drop them so we can reset them
			if ((await airports.indexes()).length > 1)
				airports.dropIndex( "accessedOn_1" );
			if ((await metars.indexes()).length > 1)
				metars.dropIndex( "accessedOn_1" );
			if ((await tafs.indexes()).length > 1)
				tafs.dropIndex( "accessedOn_1" );

            // Use Mongo's "Time to Live" collection feature to remove elements that have been there for a certain
            // length of time (i.e., how many seconds have we stored this for?)
            airports.createIndex({"accessedOn": 1}, {expireAfterSeconds: 86400}); // Expires after 24 hours
            metars.createIndex({"accessedOn": 1}, {expireAfterSeconds: 900}); // Expires after 15 minutes
            tafs.createIndex({"accessedOn": 1}, {expireAfterSeconds: 900}); // Expires after 15 minutes
        }
    }
);

app.use(express.json());

/**
 * Asynchronous function used to fetch our airport/station information
 * and will throw an error if nothing is returned.
 * 
 * @param {String} icao Airport ICAO identifier
 * @returns JSON containing airport information
 */
const getAirport = async (icao) => {
	try {
		var fullURL = url + "/station/" + icao + key;

		const res = await axios.get(fullURL);
		const json = res.data;

		// Throw error for an empty object
		if (json.results === 0) throw icao + " is not a valid airport";

		return json.data[0];
	} catch (e) {
		console.log("Error:", e);
		throw e;
	}
};

/**
 * Asynchronous function used to fetch our METAR for said airport
 * and will throw an error if nothing is returned.
 * 
 * @param {String} icao Airport ICAO identifier
 * @returns JSON containing METAR information
 */
const getMETAR = async (icao) => {
	try {
		var fullURL = url + "/metar/" + icao + "/decoded" + key;

		const res = await axios.get(fullURL);
		const json = res.data;

		// Throw error for an empty object
		if (json.results === 0) throw "No available METAR for " + icao;

		return json.data[0];
	} catch (e) {
		console.log("Error:", e);
		throw e;
	}
};

/**
 * Asynchronous function used to fetch our TAF for said airport
 * and will throw an error if nothing is returned.
 * 
 * @param {String} icao Airport ICAO identifier
 * @returns JSON containing TAF information
 */
const getTAF = async (icao) => {
	try {
		var fullURL = url + "/taf/" + icao + "/decoded" + key;

		const res = await axios.get(fullURL);
		const json = res.data;

		// Throw error for an empty object
		if (json.results === 0) throw "No available TAF for " + icao;

		return json.data[0];
	} catch (e) {
		console.log("Error:", e);
		throw e;
	}
};

// Get airport information
app.get('/airport/:icao', async (req, res) => {
	try {
		let icao = req.params.icao.toUpperCase();

		// Check if the db has the airport
		const airport = await airports.findOne({icao: icao});
		
		// If the airport was found in our DB
		if (airport)
		{
			console.log(`${icao} airport information found!`);
			res.send(airport);
		}
		// The airport was not found in our DB
		else
		{
			console.log(`\n${icao} airport information not found in DB\nAttempting to fetch airport info and add it to our DB`);

			// Try and get the airport (possibly not valid)
			try {
				const airport = await getAirport(icao);

				if (airport)
				{airport.accessedOn = new Date();
	
				airports.insertOne(airport);
				console.log(`\n${icao}'s airport information was successfully added to the DB`);
				res.send(airport);}	
			}
			// Airport not found
			catch (error) {
				console.log("Airport Not Received in API Fetch:", error);
				res.sendStatus(404);
			}
		}
	}
	catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// Get METAR report
app.get('/metar/:icao', async (req, res) => {
	try {
		let icao = req.params.icao.toUpperCase();

		// Check if the db has the airport's METAR report
		const metar = await metars.findOne({icao: icao});
		
		// If the METAR was found in our DB
		if (metar)
		{
			console.log(`${icao} METAR information found!`);
			res.send(metar);
		}
		// The METAR was not found in our DB
		else
		{
			console.log(`\n${icao} METAR information not found in DB\nAttempting to fetch METAR and add it to our DB`);

			// Try and get the METAR (possibly not valid)
			try {
				const metar = await getMETAR(icao);

				if (metar)
				{metar.accessedOn = new Date();
	
				metars.insertOne(metar);
				console.log(`\n${icao}'s METAR report was successfully added to the DB`);
				res.send(metar);}	
			}
			// METAR Report not found
			catch (error) {
				console.log("Error Fetching METAR Report:", error);
				res.sendStatus(404);
			}
		}
	}
	catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// Get TAF report
app.get('/taf/:icao', async (req, res) => {
	try {
		let icao = req.params.icao.toUpperCase();

		// Check if the db has the airport's TAF report
		const taf = await tafs.findOne({icao: icao});
		
		// If the TAF was found in our DB
		if (taf)
		{
			console.log(`${icao} TAF information found!`);
			res.send(taf);
		}
		// The TAF was not found in our DB
		else
		{
			console.log(`\n${icao} TAF information not found in DB\nAttempting to fetch TAF and add it to our DB`);

			// Try and get the TAF (possibly not valid)
			try {
				const taf = await getTAF(icao);

				if (taf)
				{
					taf.accessedOn = new Date();
		
					tafs.insertOne(taf);
					console.log(`\n${icao}'s TAF report was successfully added to the DB`);
					res.send(taf);
				}
			}
			// TAF Report not found
			catch (error) {
				console.log("Error Fetching TAF Report:", error);
				res.sendStatus(404);
			}
		}
	}
	catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

app.listen(PORT, () => {
    console.log(`Weather API running on port ${PORT}`);
});
