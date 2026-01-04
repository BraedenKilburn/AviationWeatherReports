const API_BASE_URL = process.env.API_BASE_URL
const API_KEY = process.env.API_KEY

if (!API_BASE_URL || !API_KEY) {
  throw new Error(
    'Missing required environment variables: API_BASE_URL, API_KEY',
  )
}

export async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const response = await fetch(url, {
    headers: {
      'X-API-Key': API_KEY as string,
    },
  })

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    )
  }

  return response.json() as Promise<T>
}
