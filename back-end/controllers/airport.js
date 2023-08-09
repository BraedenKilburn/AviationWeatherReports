import axios from '../axios.js';

const handlePromise = (promise) => {
  return promise.catch(() => null);
};

/**
 * Asynchronous function used to fetch our airport/station information
 * and will throw an error if nothing is returned.
 *
 * @param {string} icao Airport ICAO identifier
 * @returns JSON containing airport information
 */
const getAirport = async (icao) => {
  try {
    const [airport, datetime] = await Promise.all([
      handlePromise(axios.get(`/station/${icao}/`)),
      handlePromise(axios.get(`/station/${icao}/datetime`))
    ]);

    if (!airport) {
      throw new Error('Failed to fetch airport data');
    }

    const airportInfo = airport.data.data[0];

    if (!datetime) return airportInfo;

    const datetimeInfo = datetime.data.data[0];

    return {
      ...airportInfo,
      ...datetimeInfo,
    }
  } catch (e) {
    console.error('Error:', e);
    throw e;
  }
};


export const retrieveAirportInfo = async (req, res) => {
  let icao = req.params.icao.toUpperCase();

  // Try and get the airport (possibly not valid)
  try {
    const airport = await getAirport(icao);

    if (airport) {
        airport['retrieved_on'] = Date.now();
        res.send(airport);
    } else {
        res.sendStatus(404);
    }
  } catch (error) {
    // Error fetching airport
    console.error('Error fetching airport:', error);
    res.sendStatus(500);
  }
}
