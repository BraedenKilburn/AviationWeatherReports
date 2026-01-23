export interface TafTimestamp {
  issued?: string
  from: string
  to: string
}

export interface TafStation {
  geometry: {
    coordinates: [number, number]
    type: string
  }
  location: string
  name: string
  type: string
}

export interface Cloud {
  base_feet_agl?: number
  base_meters_agl?: number
  code: string
  text: string
  feet?: number
  meters?: number
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

export interface ChangeIndicator {
  code: string
  text: string
  desc: string
}

export interface Condition {
  code: string
  text: string
}

export interface ForecastPeriod {
  clouds?: Cloud[]
  timestamp: {
    from: string
    to: string
  }
  visibility?: Visibility
  wind?: Wind
  conditions?: Condition[]
  change?: {
    probability?: number
    indicator: ChangeIndicator
  }
}

export interface TafData {
  icao: string
  timestamp: TafTimestamp
  station: TafStation
  raw_text: string
  forecast: ForecastPeriod[]
  retrieved_on: number
}
