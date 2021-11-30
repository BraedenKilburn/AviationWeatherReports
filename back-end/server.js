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

// Connect to our MongoDB
MongoClient.connect(
    connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
        if (err) 
            console.log(err);
        else
        {
            db = client.db();

            // Use Mongo's "Time to Live" collection feature to remove elements that have been there for a certain
            // length of time (i.e., how many seconds have we stored this for?)
            db.collection('airport').createIndex({"retrievedOn": 1}, {expireAfterSeconds: 86400}); // Expires after 24 hours
            db.collection('metar').createIndex({"retrievedOn": 1}, {expireAfterSeconds: 900}); // Expires after 15 minutes
            db.collection('taf').createIndex({"retrievedOn": 1}, {expireAfterSeconds: 900}); // Expires after 15 minutes
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
		if (json.results === 0) throw "Invalid Airport";

		return json.data[0];
	} catch (e) {
		console.log("Error:", e);
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
		if (json.results === 0) throw "Error in GetMETAR";

		return json.data[0];
	} catch (e) {
		console.log("Error:", e);
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
		if (json.results === 0) throw "No available TAF";

		return json.data[0];
	} catch (e) {
		console.log("Error:", e);
	}
};

// Get airport information (hard-coded KVGT for now)
app.get('/airport', (req, res) => {
    // db.collection('airport').insertOne({text: req.body.text}
});

// Add airport information
app.post('/airport', async (req, res) => {
    const airport = await getAirport("KVGT");
    airport.retrievedOn = new Date();

    db.collection('airport').insertOne(airport);

    res.send(airport);
});

app.put('/', (req, res) => {
    res.send('I am updated.\n');
});

app.delete('/', (req, res) => {
    res.send('All my memories have been deleted. Are you happy now?\n');
});

app.listen(PORT, () => {
    console.log(`Node.js App running on port ${PORT}`);
});
