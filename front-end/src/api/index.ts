import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

/**
 * Fetch info from api
 * @param type info type (airport, metar, taf)
 * @param airportCode icao airport code
 * @returns object with info or null if not found
 */
export const fetchInfo = async (type: string, airportCode: string) => {
  try {
    const response = await api.get(`api/${type}/${airportCode}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

/**
 * Fetch all info from api (airport, metar, taf)
 * @param icao airport icao code
 * @returns array with airport, metar and taf info
 */
export const fetchAllInfo = async (icao: string) => {
  return await Promise.all([
    fetchInfo('airport', icao),
    fetchInfo('metar', icao),
    fetchInfo('taf', icao),
  ]);
};

export default api;