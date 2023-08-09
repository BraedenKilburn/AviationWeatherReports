declare module API {
  export interface AirportResponse {
    activated?: string;
    city?: string;
    country?: Country;
    elevation?: Elevation;
    geometry: Geometry;
    iata?: string;
    icao: string;
    latitude: Latitude;
    longitude: Longitude;
    location: string;
    magnetic_variation?: MagneticVariation;
    name: string;
    region: Region;
    sectional?: string;
    state?: State;
    status?: 'Operational' | 'Closed';
    type?: string;
    useage?: string;
    timezone?: Timezone;
    timestamp?: Timestamp;
  }

  interface Country {
    code?: string;
    name?: string;
  }

  interface Elevation {
    feet?: number;
    meters?: number;
    method?: 'Surveyed' | 'Estimated';
  }

  interface Geometry {
    coordinates: [number, number]; // assuming coordinates are [longitude, latitude]
    type: 'POINT';
  }

  interface Latitude {
    decimal?: number;
    degrees?: string;
  }

  interface Longitude {
    decimal?: number;
    degrees?: string;
  }

  interface MagneticVariation {
    position?: string;
    year?: string;
  }

  interface Region {
    code: string;
    name: string;
  }

  interface State {
    code?: string;
    name?: string;
  }

  interface Timezone {
    dst: number;
    gmt: number;
    tzid: string;
    zone: string;
  }

  interface Timestamp {
    local: {
      current: string;
      date: string;
      time: string;
    };
    utc: {
      current: string;
      date: string;
      time: string;
    };
  }

  export interface MetarResponse {
    barometer?: Barometer;
    ceiling?: Ceiling;
    clouds?: CloudLevel[];
    conditions?: ConditionLevel[];
    dewpoint?: Dewpoint;
    elevation?: Elevation;
    flight_category?: 'VFR' | 'MVFR' | 'IFR' | 'LIFR';
    humidity?: Humidity;
    icao: string;
    observed: string;
    snow?: Snow;
    station: Station;
    temperature?: Temperature;
    rain?: Rain;
    raw_text: string;
    visibility?: Visibility;
    wind?: Wind;
  }

  interface Barometer {
    hg?: number;
    hpa?: number;
    kpa?: number;
    mb?: number;
  }

  interface Ceiling {
    feet?: number;
    meters?: number;
  }

  interface CloudLevel {
    base_feet_agl?: number;
    base_meters_agl?: number;
    code?: string;
    text?: string;
    feet?: number;
    meters?: number;
  }

  interface ConditionLevel {
    code?: string;
    text?: string;
  }

  interface Dewpoint {
    celsius?: number;
    fahrenheit?: number;
  }

  interface Elevation {
    feet?: number;
    meters?: number;
  }

  interface Humidity {
    percent?: number;
  }

  interface Snow {
    inches?: number;
    millimeters?: number;
  }

  interface Station {
    geometry: Geometry;
    location: string;
    name: string;
    type?: 'Airport' | 'Heliport' | 'Seaplane Base' | string;
  }

  interface Temperature {
    celsius?: number;
    fahrenheit?: number;
  }

  interface Rain {
    inches?: number;
    millimeters?: number;
    total?: {
      inches?: number;
      millimeters?: number;
    };
  }

  interface Visibility {
    miles?: string;
    miles_float?: number;
    meters?: string;
    meters_float?: number;
  }

  interface Wind {
    degrees?: number;
    speed_kph?: number;
    speed_kts?: number;
    speed_mph?: number;
    speed_mps?: number;
    gust_kts?: number;
    gust_kph?: number;
    gust_mph?: number;
    gust_mps?: number;
  }

  interface Geometry {
    coordinates: [number, number]; // assuming coordinates are [longitude, latitude]
    type: 'POINT';
  }

  export interface TafResponse {
    icao: string;
    forecast: Forecast[];
    raw_text: string;
    station: Station;
    timestamp: TimestampOverall;
  }
  
  interface Forecast {
    change?: Change;
    clouds?: CloudLevel[];
    conditions?: ConditionLevel[];
    icing?: IcingLevel[];
    turbulence?: TurbulenceLevel[];
    timestamp: TimestampSection;
    visibility?: Visibility;
    wind?: Wind;
  }
  
  interface Change {
    probability?: number;
    indicator?: {
      code?: string;
      text?: string;
      desc?: string;
    };
  }
  
  interface CloudLevel {
    code?: string;
    text?: string;
    feet?: number;
    meters?: number;
  }
  
  interface ConditionLevel {
    code?: string;
    text?: string;
  }
  
  interface Altitude {
    feet?: number;
    meters?: number;
  }
  
  interface Intensity {
    code?: number;
    desc?: string;
  }
  
  interface IcingLevel {
    minimum?: Altitude;
    maximum?: Altitude;
    intensity?: Intensity;
  }
  
  interface TurbulenceLevel {
    minimum?: Altitude;
    maximum?: Altitude;
    intensity?: Intensity;
  }
  
  interface TimestampSection {
    from: string;
    to: string;
  }
  
  interface Visibility {
    miles?: string;
    miles_float?: number;
    meters?: string;
    meters_float?: number;
  }
  
  interface Wind {
    degrees?: number;
    speed_kts?: number;
    speed_kph?: number;
    speed_mph?: number;
    speed_mps?: number;
    gust_kts?: number;
    gust_kph?: number;
    gust_mph?: number;
    gust_mps?: number;
  }
  
  interface Geometry {
    coordinates: [number, number];
    type: 'POINT';
  }
  
  interface Station {
    geometry: Geometry;
    name: string;
    type?: 'Airport' | 'Heliport' | 'Seaplane Base' | string;
  }
  
  interface TimestampOverall {
    issued: string;
    from: string;
    to: string;
  }  
}
