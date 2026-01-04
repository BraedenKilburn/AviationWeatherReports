import type { BunRequest } from 'bun'
import { fetchFromAPI } from '../utils/http-client'

export async function retrieveAirportInfo(
  request: BunRequest,
): Promise<Response> {
  const icao = request.params.icao?.toUpperCase()
  if (!icao) {
    return new Response('ICAO code is required', { status: 400 })
  }

  try {
    const [stationData, datetimeData] = await Promise.all([
      fetchFromAPI<APIResponse>(`/station/${icao}/`),
      fetchFromAPI<APIResponse>(`/station/${icao}/datetime`),
    ])

    if (stationData.results === 0)
      return new Response('Airport not found', { status: 404 })
    else if (datetimeData.results === 0)
      return new Response('Datetime not found', { status: 404 })

    const responseData = {
      ...stationData.data[0],
      ...datetimeData.data[0],
      retrieved_on: Date.now(),
    }

    return new Response(JSON.stringify(responseData), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(`Error fetching airport info for ${icao}:`, error)
    return new Response('Internal server error', { status: 500 })
  }
}
