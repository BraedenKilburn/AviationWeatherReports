import axios from "../axios.js";

/**
 * Asynchronous function used to fetch our TAF for said airport
 * and will throw an error if nothing is returned.
 *
 * @param {string} icao Airport ICAO identifier
 * @returns JSON containing TAF information
 */
const getTAF = async (icao) => {
  try {
      const { data } = await axios.get(`/taf/${icao}/decoded/`);
      return data.data[0];
  }
  catch (e) {
      console.error('Error:', e);
      throw e;
  }
};

export const retrieveTAF = async (req, res) => {
  let icao = req.params.icao.toUpperCase();

  // Try and get the TAF (possibly not valid)
  try {
    const taf = await getTAF(icao);
    if (taf) {
      taf['retrieved_on'] = Date.now();
      res.send(taf);
    } else {
      res.sendStatus(404);
    }
  }
  catch (error) {
    // TAF Report not found
    console.error('Error fetching TAF:', error);
    res.sendStatus(500);
  }
};
