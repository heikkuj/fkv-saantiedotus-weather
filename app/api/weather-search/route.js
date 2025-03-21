import { NextResponse } from "next/server";

const API_KEY = process.env.WEATHER_API_KEY;

export async function GET(request) {

    const { searchParams } = new URL(request.url);

    // Query defaults
    const query = searchParams.get('q') || 'Oslo';
    const days = searchParams.get('days') || 7;
    const aqi = searchParams.get('aqi') || 'no';
    const alerts = searchParams.get('alerts') || 'no';

    try {
        // API URL with parameters
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=${days}&aqi=${aqi}&alerts=${alerts}`;

        const response = await fetch(apiUrl);

        // If error
        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData.error?.message || `Failed to fetch weather data` },
                { status: response.status }
            );
        }

        // Parse JSON response from API
        const data = await response.json();

        // Clean up data
        const transformedData = {
            location: {
              name: data.location.name,
              region: data.location.region,
              country: data.location.country,
              lat: data.location.lat,
              lon: data.location.lon,
              localtime: data.location.localtime,
              timezone: data.location.tz_id
            },

            current: {
              temp_c: data.current.temp_c,
              temp_f: data.current.temp_f,
              condition: {
                text: data.current.condition.text,
                icon: data.current.condition.icon,
                code: data.current.condition.code
              },
              wind_kph: data.current.wind_kph,
              wind_degree: data.current.wind_degree,
              wind_dir: data.current.wind_dir,
              humidity: data.current.humidity,
              uv: data.current.uv,
              feelslike_c: data.current.feelslike_c
            },

            forecast: data.forecast.forecastday.map(day => ({
              date: day.date,
              date_epoch: day.date_epoch,
              day: {
                maxtemp_c: day.day.maxtemp_c,
                mintemp_c: day.day.mintemp_c,
                avgtemp_c: day.day.avgtemp_c,
                condition: {
                  text: day.day.condition.text,
                  icon: day.day.condition.icon,
                  code: day.day.condition.code
                },
                daily_chance_of_rain: day.day.daily_chance_of_rain,
                daily_chance_of_snow: day.day.daily_chance_of_snow
              },

              // Next 24h
              hour: day === data.forecast.forecastday[0] ? 
                day.hour.map(hour => ({
                  time: hour.time,
                  temp_c: hour.temp_c,
                  condition: {
                    text: hour.condition.text,
                    icon: hour.condition.icon,
                    code: hour.condition.code
                  },
                  chance_of_rain: hour.chance_of_rain,
                  chance_of_snow: hour.chance_of_snow
                })) : []
            }))
          };
          
          // Return transformed data
          return NextResponse.json(transformedData);
        } catch (error) {
          
        return NextResponse.json(
            { error: 'Failed to fetch weather data. Please try again later.' },
            { status: 500 }
        );
    }
}