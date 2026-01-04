import type { BunRequest } from 'bun'
import { fetchFromAPI } from '../utils/http-client'

export async function retrieveMetar(request: BunRequest): Promise<Response> {
  const icao = request.params.icao?.toUpperCase()
  if (!icao) {
    return new Response('ICAO code is required', { status: 400 })
  }

  try {
    const metarData = await fetchFromAPI<APIResponse>(`/metar/${icao}/decoded/`)
    if (metarData.results === 0)
      return new Response('METAR data not found', { status: 404 })

    const responseData = {
      ...metarData.data[0],
      retrieved_on: Date.now(),
    }

    return new Response(JSON.stringify(responseData), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(`Error fetching METAR for ${icao}:`, error)
    return new Response('Internal server error', { status: 500 })
  }
}
