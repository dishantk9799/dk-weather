import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Current from './components/Current'
import Forecast from './components/Forecast'


const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const apiKey = '578d7db6912e45b56ad8ca9ea443ca17';

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(''); // reset error

        // Get latitude and longitude
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const { lat, lon } = res.data.coord;

        // Get weather using lat/lon
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );

        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        )
        // Setting data
        setWeather(weatherRes.data);
        setForecast(forecastRes.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('City not found');
        } else {
          setError('Something went wrong');
        }
        setWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();

  }, [city]);

  return (
    <div style={{ fontFamily: "Poppins" }} className='min-h-screen bg-[#e6e6e6] flex flex-col items-center gap-2 p-4 md:p-6'>

      {/* TITLE */}
      <div className='flex flex-col items-center gap-2 md:w-64'>
        <h1 className="font-extrabold text-3xl md:text-4xl text-gray-700 [text-shadow:2px_2px_4px_#cfcfcf,-2px_-2px_4px_#ffffff]">dk weather</h1>
        <p className="w-[80%] md:w-auto text-center text-sm text-gray-500">
          Search any city to view live weather and forecasts
        </p>
      </div>

      {/* WEATHER */}
      <div className='w-full min-h-screen gap-4 grid grid-cols-1 grid-rows-[5rem_auto_auto] md:grid-cols-[2fr_1fr] md:grid-rows-[5rem_1fr]'>

        {/* SEARCH */}
        <div className='flex flex-col gap-2 justify-center items-center md:col-span-2'>
          <Search loading={loading} setCity={setCity} />
        </div>

        {/* CURRENT */}
        <div className='shadow-[4px_4px_8px_#cfcfcf,-4px_-4px_8px_#ffffff] rounded-2xl p-2'>
          <Current loading={loading} error={error} weather={weather} />
        </div>

        {/* FORECAST */}
        <div className='shadow-[4px_4px_8px_#cfcfcf,-4px_-4px_8px_#ffffff] rounded-2xl p-2'>
          <Forecast loading={loading} error={error} forecast={forecast} />
        </div>
      </div>
    </div>
  )
}

export default App
