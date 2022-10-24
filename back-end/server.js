import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, } from '@aws-sdk/lib-dynamodb';
import express from 'express';
import axios from 'axios';
import 'dotenv/config';
const API_KEY = process.env.API_KEY ?? '';
const API_BASE_URL = process.env.API_BASE_URL ?? '';
const AIRPORT_TABLE = process.env.AIRPORT_TABLE ?? '';
const METAR_TABLE = process.env.METAR_TABLE ?? '';
const TAF_TABLE = process.env.TAF_TABLE ?? '';
const PORT = process.env.PORT ?? 3000;
// AWS DynamoDB client
const client = new DynamoDBClient({ region: 'us-east-1' });
const ddb = DynamoDBDocumentClient.from(client);
const app = express();
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['X-API-Key'] = API_KEY;
/**
 * Asynchronous function used to fetch our airport/station information
 * and will throw an error if nothing is returned.
 *
 * @param {string} icao Airport ICAO identifier
 * @returns JSON containing airport information
 */
const getAirport = async (icao) => {
    try {
        const res = await axios.get(`/station/${icao}/`);
        const json = res.data;
        // Throw error for an empty object
        if (json.results === 0)
            throw `${icao} is not a valid airport`;
        return json.data[0];
    }
    catch (e) {
        console.error('Error:', e);
        throw e;
    }
};
/**
 * Asynchronous function used to fetch our METAR for said airport
 * and will throw an error if nothing is returned.
 *
 * @param {string} icao Airport ICAO identifier
 * @returns JSON containing METAR information
 */
const getMETAR = async (icao) => {
    try {
        const res = await axios.get(`/metar/${icao}/decoded/`);
        const json = res.data;
        // Throw error for an empty object
        if (json.results === 0)
            throw `No available METAR for ${icao}`;
        return json.data[0];
    }
    catch (e) {
        console.error('Error:', e);
        throw e;
    }
};
/**
 * Asynchronous function used to fetch our TAF for said airport
 * and will throw an error if nothing is returned.
 *
 * @param {string} icao Airport ICAO identifier
 * @returns JSON containing TAF information
 */
const getTAF = async (icao) => {
    try {
        const res = await axios.get(`/taf/${icao}/decoded/`);
        const json = res.data;
        // Throw error for an empty object
        if (json.results === 0)
            throw `No available TAF for ${icao}`;
        return json.data[0];
    }
    catch (e) {
        console.error('Error:', e);
        throw e;
    }
};
/**
 * Check for airport/station information in DynamoDB
 * @param icao Airport ICAO identifier
 * @param TableName DDB table name
 * @returns Retrieved item from DDB
 */
const checkForItem = async (icao, TableName) => {
    try {
        const params = {
            TableName,
            Key: { icao },
        };
        const command = new GetCommand(params);
        const data = await ddb.send(command);
        return data.Item;
    }
    catch (e) {
        console.error('Error:', e);
        throw e;
    }
};
const getUnixTime = () => {
    return Math.floor(Date.now() / 1000);
};
// Get airport information
app.get('/api/airport/:icao', async (req, res) => {
    try {
        let icao = req.params.icao.toUpperCase();
        const data = await checkForItem(icao, AIRPORT_TABLE);
        // If the airport was found in our DB
        if (data) {
            console.log(`${icao} airport information found!`);
            res.send(data);
        }
        // The airport was not found in our DB
        else {
            console.log(`${icao} airport information not found in DB`);
            console.log(`Fetching ${icao} airport information from API...`);
            // Try and get the airport (possibly not valid)
            try {
                const airport = await getAirport(icao);
                if (airport) {
                    airport['retrieved_on'] = getUnixTime();
                    // Add the airport to our DB
                    const putParams = {
                        TableName: AIRPORT_TABLE,
                        Item: airport,
                    };
                    const putCommand = new PutCommand(putParams);
                    await ddb.send(putCommand);
                    console.log(`\n${icao}'s airport information was successfully added to the DB`);
                    res.send(airport);
                }
            }
            catch (error) {
                // Airport not found
                console.error('Airport Not Received in API Fetch:', error);
                res.sendStatus(404);
            }
        }
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
// Get METAR report
app.get('/api/metar/:icao', async (req, res) => {
    let icao = req.params.icao.toUpperCase();
    try {
        // Check if the db has the METAR
        const data = await checkForItem(icao, METAR_TABLE);
        // If the METAR was found in our DB
        if (data) {
            console.log(`${icao} METAR found!`);
            res.send(data);
        }
        // The METAR was not found in our DB
        else {
            console.log(`${icao} METAR not found in DB`);
            console.log(`Fetching ${icao} METAR from API...`);
            // Try and get the METAR (possibly not valid)
            try {
                const metar = await getMETAR(icao);
                if (metar) {
                    metar['retrieved_on'] = getUnixTime();
                    console.log(metar);
                    // Add the METAR to our DB
                    const putParams = {
                        TableName: METAR_TABLE,
                        Item: metar,
                    };
                    const putCommand = new PutCommand(putParams);
                    await ddb.send(putCommand);
                    console.log(`\n${icao}'s METAR was successfully added to the DB`);
                    res.send(metar);
                }
            }
            catch (error) {
                // METAR not found
                console.error('METAR Not Received in API Fetch:', error);
                res.sendStatus(404);
            }
        }
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
// Get TAF report
app.get('/api/taf/:icao', async (req, res) => {
    let icao = req.params.icao.toUpperCase();
    try {
        // Check if the db has the airport's TAF report
        const data = await checkForItem(icao, TAF_TABLE);
        // If the TAF was found in our DB
        if (data) {
            console.log(`${icao} TAF information found!`);
            res.send(data);
        }
        // The TAF was not found in our DB
        else {
            console.log(`${icao} TAF information not found in DB`);
            console.log(`Fetching ${icao} TAF information from API...`);
            // Try and get the TAF (possibly not valid)
            try {
                const taf = await getTAF(icao);
                if (taf) {
                    // Expire after 15 minutes
                    taf['retrieved_on'] = getUnixTime();
                    // Add the TAF to our DB
                    const putParams = {
                        TableName: TAF_TABLE,
                        Item: taf,
                    };
                    const putCommand = new PutCommand(putParams);
                    await ddb.send(putCommand);
                    console.log(`\n${icao}'s TAF report was successfully added to the DB`);
                    res.send(taf);
                }
            }
            catch (error) {
                // TAF Report not found
                console.error('Error Fetching TAF Report:', error);
                res.sendStatus(404);
            }
        }
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
app.listen(PORT, () => {
    console.log(`Weather API running on port ${PORT}`);
});
