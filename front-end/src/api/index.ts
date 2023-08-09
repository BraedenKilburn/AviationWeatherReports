import axios, { AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
const api = axios.create({ baseURL });

/**
 * Fetch info from api
 * @param type info type (airport, metar, taf)
 * @param airportCode icao airport code
 * @returns object with info or null if not found
 */
export const fetchInfo = async (type: string, airportCode: string) => {
  try {
    const response = await api.get(`${type}/${airportCode}`);
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
export const fetchAllInfo = async (icao: string): Promise<[API.AirportResponse, API.MetarResponse, API.TafResponse]> => {
  return await Promise.all([
    fetchInfo('airport', icao),
    fetchInfo('metar', icao),
    fetchInfo('taf', icao),
  ]);
};

export default api;