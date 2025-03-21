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
    <div className='flex flex-col lg:flex-nowrap items-center justify-center gap-1 w-[100vw] font-poppins'>

            {/* Error msg */}

            {error && (
            <div className='absolute top-[70px] bg-red-100 rounded-full text-center content-center w-[50vw] h-[30px]'>
                <p>Fant ikke lokasjon.</p>
            </div>
        )}

        <form onSubmit={searchWeather} className='flex flex-col lg:flex-row lg:items-center lg:gap-2 max-w-[600px] overflow-visible !pb-[10px]'>
            <input 
            type='search' 
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
            placeholder='Kohta' 
            className='lg:!my-0 !mb-[5px] w-[70vw] lg:flex-grow max-w-[600px] !py-3 !px-6 h-[2em] rounded-full inset-shadow-[1px_4px_5px_rgba(0,0,0,0.266)] focus:border-none text-black placeholder:text-light-t bg-white' />
                <button
                type='submit'
                disabled={loading}
                className='flex justify-center items-center gap-1.5 w-[70vw] max-w-[600px] lg:w-[140px] lg:min-w-[140px] h-[2em] rounded-full text-white shadow-[1px_4px_5px_rgba(0,0,0,0.266)] hover:cursor-pointer bg-indigo-t active:bg-indigo'
                >
                    <FaSearchLocation className='text-[1em]' />
                    Haje 
                </button>
        </form>

        {weather && (
            // LOCATION
            <div className='md:!mt-[10px] lg:!mt-[10px] !p-4 flex-col'>
                {/* <div className='h-full w-[50vw] max-w-[600px] !p-4 font-sawarabi text-center uppercase bg-white rounded-full shadow-[1px_4px_5px_rgba(0,0,0,0.266)]'>
                <h2 className='font-semibold text-l'>
                    {weather.location.name}
                </h2>
                <h3 className='normal-case !mt-1'>{weather.location.country}</h3>
            </div> */}
            <div className='h-full w-[50vw] max-w-[600px] place-self-center !p-4 font-sawarabi text-center uppercase text-white drop-shadow-[1px_4px_5px_rgba(0,0,0,0.266)]'>
                <h2 className='font-semibold text-[1.5em] lg:text-[2em]'>
                    {weather.location.name}
                </h2>
                <h3 className='normal-case text-[0.9em] lg:text-[1.3em]'>{weather.location.country}</h3>
            </div>

            <div className='flex w-[30vw] min-w-[180px] max-w-[250px] h-[30vw] min-h-[180px] max-h-[250px] rounded-full !mt-[10px] !mb-[30px] items-center justify-center place-self-center bg-white'>
                <div className='text-center'>

                    {/* WEATHER ICON */}
                    <img src={`https:${weather.current.condition.icon}`}
                    alt={weather.current.condition.text} className='place-self-center lg:!pt-[20px]'/>

                    {/* TEMPERATURE */}
                    <p className='font-semibold text-[2em] md:text-[3em] lg:text-[3.5em]'>{weather.current.temp_c}°C</p>
                    <p className='!p-[15px] lg:!p-[30px] md:text-[1.3em] lg:text-[1.5em]'>{weather.current.condition.text}</p>
                </div>
            </div>

                {/*  WEATHER DETAILS */}
                <div className='h-full w-[50vw] max-w-[600px] !min-w-[300px] !p-4 font-sawarabi text-center normal-case text-[1em] md:text-[1.2em] bg-white rounded-full shadow-[1px_4px_5px_rgba(0,0,0,0.266)]'>
                    <p>Føles som: {weather.current.feelslike_c}°C</p>
                    <p>Vind: {weather.current.wind_kph} km/t {weather.current.wind_dir}</p>
                    <p>Fuktighet: {weather.current.humidity}%</p>
                </div>
                {/* <div className='h-full w-[50vw] max-w-[600px] !p-4 font-sawarabi text-center normal-case tracking-wider leading-loose text-white drop-shadow-[1px_4px_5px_rgba(0,0,0,0.266)]'>
                    <p>Føles som: {weather.current.feelslike_c}°C</p>
                    <p>Vind: {weather.current.wind_kph} km/t {weather.current.wind_dir}</p>
                    <p>Fuktighet: {weather.current.humidity}%</p>
                </div> */}
            </div>

            
        )}

    </div>

  );
}
