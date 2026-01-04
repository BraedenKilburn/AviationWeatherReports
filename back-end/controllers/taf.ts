import type { BunRequest } from 'bun'
import { fetchFromAPI } from '../utils/http-client'

export async function retrieveTAF(request: BunRequest): Promise<Response> {
  const icao = request.params.icao?.toUpperCase()
  if (!icao) {
    return new Response('ICAO code is required', { status: 400 })
  }

  try {
    const tafData = await fetchFromAPI<APIResponse>(`/taf/${icao}/decoded/`)
    if (tafData.results === 0)
      return new Response('TAF data not found', { status: 404 })

    const responseData = {
      ...tafData.data[0],
      retrieved_on: Date.now(),
    }

    return new Response(JSON.stringify(responseData), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(`Error fetching TAF for ${icao}:`, error)
    return new Response('Internal server error', { status: 500 })
  }
}
