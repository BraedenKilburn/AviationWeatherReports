import { retrieveAirportInfo, retrieveMetar, retrieveTAF } from './controllers'

const PORT = process.env.PORT || 3000
const isDev = process.env.NODE_ENV === 'development'
const allowedOrigin = isDev ? '*' : 'https://wx.braedenkilburn.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function withCors(response: Response): Response {
  const headers = new Headers(response.headers)

  Object.entries(corsHeaders).forEach(([key, value]) => {
    headers.set(key, value)
  })

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

Bun.serve({
  port: PORT,
  routes: {
    '/airport/:icao': {
      GET: async (req) => withCors(await retrieveAirportInfo(req)),
      OPTIONS: () => withCors(new Response(null, { status: 204 })),
    },
    '/metar/:icao': {
      GET: async (req) => withCors(await retrieveMetar(req)),
      OPTIONS: () => withCors(new Response(null, { status: 204 })),
    },
    '/taf/:icao': {
      GET: async (req) => withCors(await retrieveTAF(req)),
      OPTIONS: () => withCors(new Response(null, { status: 204 })),
    },
  },
  error(error) {
    console.error('Server error:', error)
    return new Response('Internal Server Error', { status: 500 })
  },
})

console.log(`Server running on port ${PORT}`)
