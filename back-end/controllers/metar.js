import axios from '../axios.js';

/**
 * Asynchronous function used to fetch our METAR for said airport
 * and will throw an error if nothing is returned.
 *
 * @param {string} icao Airport ICAO identifier
 * @returns JSON containing METAR information
 */
const getMETAR = async (icao) => {
  try {
    const { data } = await axios.get(`/metar/${icao}/decoded/`);
    return data.data[0];
  }
  catch (e) {
    console.error('Error:', e);
    throw e;
  }
};

export const retrieveMetar = async (req, res) => {
  let icao = req.params.icao.toUpperCase();
  
  // Try and get the METAR (possibly not valid)
  try {
    const metar = await getMETAR(icao);

    if (metar) {
      metar['retrieved_on'] = Date.now();
      res.send(metar);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error fetching METAR:', error);
    res.sendStatus(500);
  }
};
