export interface Barometer {
  hg: number
  hpa: number
  kpa: number
  mb: number
}

export interface Ceiling {
  feet: number
  meters: number
}

export interface Cloud {
  base_feet_agl?: number
  base_meters_agl?: number
  code: string
  text: string
  feet?: number
  meters?: number
}

export interface Temperature {
  celsius: number
  fahrenheit: number
}

export interface Humidity {
  percent: number
}

export interface Visibility {
  miles: number
  miles_text: string
  meters: number
  meters_text: string
}

export interface Wind {
  degrees: number
  speed_kph: number
  speed_kts: number
  speed_mph: number
  speed_mps: number
}

export interface MetarStation {
  geometry: {
    coordinates: [number, number]
    type: string
  }
  location: string
  name: string
  type: string
}

export interface MetarData {
  icao: string
  barometer: Barometer
  ceiling?: Ceiling
  clouds: Cloud[]
  dewpoint: Temperature
  elevation: {
    feet: number
    meters: number
  }
  flight_category: string
  humidity: Humidity
  observed: string
  station: MetarStation
  temperature: Temperature
  raw_text: string
  visibility: Visibility
  wind: Wind
  retrieved_on: number
}
