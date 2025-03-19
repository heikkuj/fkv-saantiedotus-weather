'use client'

import { React, useState } from 'react'
import { FaSearchLocation } from "react-icons/fa";

export default function Search() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchWeather = async (e) => {
        e?.preventDefault();
        if (!query.trim()) return;

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`/api/weather-search?q=${encodeURIComponent(query)}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch weather data');
            }

            const data = await response.json();
            setWeather(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='flex flex-row gap-1 items-center justify-center !m-3 font-poppins'>
        <form onSubmit={searchWeather} className='flex gap-2'>
            <input 
            type='search' 
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
            placeholder='Kohta' 
            className='flex-1 m-[20px] py-[10px] px-[20px] h-[2em] w-[50vw] max-w-[400px] rounded-[15px] inset-shadow-[1px_4px_5px_rgba(0,0,0,0.266)] foucs:border-none placeholder:p-[14px] text-black placeholder:text-light-t bg-white' />
            <button
            type='submit'
            disabled={loading}
            className='text-white drop-shadow-[1px_1px_2px_rgba(0,0,0,0.485)] hover:cursor-pointer'
            >
                <FaSearchLocation className='text-[1.5em]' />
                Søk 
            </button>
        </form>

        {error && (
            <div className='!mt-4 !p-4 bg-red-100 rounded-md'>
                {error}
            </div>
        )}

        {weather && (
            <div className='!mt-4 !p-4 bg-white'>
                <h2 className='text-xl'>
                    {weather.location.name}, {weather.location.country}
                </h2>

                {/* WEATHER ICON */}
                <div className='flex items-center'>
                    <img src={`https:${weather.current.condition.icon}`}
                    alt={weather.current.condition.text}/>

                    {/* TEMPERATURE */}
                    <div>
                        <p>{weather.current.temp_c}°C</p>
                        <p>{weather.current.condition.text}</p>
                    </div>
                </div>

                <div>
                    <p>Føles som: {weather.current.feelslike_c}°C</p>
                    <p>Vind: {weather.current.wind_kph} km/t {weather.current.wind_dir}</p>
                    <p>Fuktighet: {weather.current.humidity}</p>
                </div>
            </div>
        )}
    </div>

  );
}
