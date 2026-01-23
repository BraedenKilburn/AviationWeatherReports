export interface Country {
  code: string
  name: string
}

export interface State {
  code: string
  name: string
}

export interface Elevation {
  feet: number
  meters: number
}

export interface Coordinates {
  decimal: number
  degrees: string
}

export interface Geometry {
  coordinates: [number, number]
  type: string
}

export interface Timezone {
  dst: boolean
  gmt: number
  tzid: string
  zone?: string
}

export interface TimeData {
  current: string
  date: string
  time: string
}

export interface Timestamp {
  local: TimeData
  utc: TimeData
}

export interface StationData {
  icao: string
  city: string
  country: Country
  elevation: Elevation
  geometry: Geometry
  iata: string
  latitude: Coordinates
  longitude: Coordinates
  location: string
  name: string
  state: State
  type: string
  timezone: Timezone
  timestamp: Timestamp
  retrieved_on: number
}
