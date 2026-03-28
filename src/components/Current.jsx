import CurrentCard from '../ui/CurrentCard';
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineVisibility, MdSpeed } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { BsSunrise, BsSunset } from "react-icons/bs";
import { LuSearchX } from "react-icons/lu";
import { IoWarning } from "react-icons/io5";

const Current = ({ weather, error, loading }) => {
    const formatDate = (timestamp, timezone) => {
        return new Date((timestamp + timezone) * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });
    };
    const formatTime = (timestamp, timezone) => {
        return new Date((timestamp + timezone) * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'UTC'
        });
    };

    const toCelsius = (temp) => Math.round(temp - 273.15);

    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    if (loading) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center duration-100">

                {/* LOADER */}
                <div className="w-16 h-16 rounded-full shadow-[inset_6px_6px_12px_#cfcfcf,inset_-6px_-6px_12px_#ffffff] flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-gray-500 border-t-gray-700 rounded-full animate-spin"></div>
                </div>
                <h1 className="text-gray-700 text-xl font-bold">
                    Loading Weather...
                </h1>
            </div>
        );
    } else {
        return (
            <>
                {error ? (
                    <>
                        {/* IF NOT WEATHER DATA */}
                        <div className='w-full h-full flex flex-col items-center justify-center gap-4 text-center duration-100'>

                            {/* ICON */}
                            <div className='p-6 rounded-full shadow-[inset_6px_6px_12px_#cfcfcf,inset_-6px_-6px_12px_#ffffff]'>
                                {error === 'City not found' ? <LuSearchX size={40} className='text-gray-500' /> : <IoWarning size={40} className='text-gray-500' />}
                            </div>

                            {/* TEXT */}
                            <div>
                                <h1 className='text-gray-700 text-xl font-bold'>
                                    {error === 'City not found' ? 'City not found' : 'Something went wrong'}
                                </h1>
                                <p className='text-gray-500 text-sm mt-1'>
                                    Couldn't load weather data. Please check the city name or try again.
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {
                            weather ? (
                                <>
                                    <div className='p-4 lg:p-6 flex flex-col gap-4 duration-100'>

                                        {/* LOCATION, DATE AND TIME */}
                                        <div className='flex justify-between'>
                                            <div className='flex items-center gap-2'>
                                                <span className='p-2 lg:p-3 shadow-[4px_4px_8px_#cfcfcf,-4px_-4px_8px_#ffffff] rounded-full'><CiLocationOn className='animate-bounce' size={20} /></span>
                                                <div>
                                                    <h1 className='text-gray-700 font-bold text-xs lg:text-sm'>{weather.name}</h1>
                                                    <p className='text-gray-600 text-[10px] lg:text-xs'>{weather.sys.country}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className='text-gray-700 font-bold text-xs lg:text-sm'>{formatDate(weather.dt, weather.timezone)}</h1>
                                                <p className='text-gray-600 text-[10px] lg:text-xs text-right'>{formatTime(weather.dt, weather.timezone)}</p>
                                            </div>
                                        </div>

                                        {/* TEMPERATURE */}
                                        <div className='flex justify-center'>
                                            <div className='h-46 w-46 flex flex-col justify-center items-center shadow-[inset_8px_8px_16px_#cfcfcf,inset_-8px_-8px_16px_#ffffff]  rounded-full'>
                                                <h1 className='text-gray-700 font-extrabold text-6xl mt-4'>{toCelsius(weather.main.temp)}°<span className='text-3xl font-extrabold'>C</span></h1>
                                                <p className='text-gray-600 font-bold'>{capitalize(weather.weather[0].description)}</p>
                                            </div>
                                        </div>

                                        {/* INFO CARDS */}
                                        <div className='w-full grid gap-4 grid-cols-1 md:grid-cols-2 grid-rows-6 md:grid-rows-3'>
                                            <CurrentCard val={`${weather?.main?.humidity}%`} icon={<WiHumidity size={20} />} label={"Humidity"} />
                                            <CurrentCard val={`${weather?.visibility / 1000} km`} icon={<MdOutlineVisibility size={20} />} label={"visibility"} />
                                            <CurrentCard val={`${weather?.main?.pressure} hPa`} icon={<MdSpeed size={20} />} label={"Pressure"} />
                                            <CurrentCard val={`${toCelsius(weather?.main?.feels_like)}°C`} icon={<FaTemperatureThreeQuarters size={20} />} label={"Feels Like"} />
                                            <CurrentCard val={formatTime(weather?.sys?.sunrise, weather?.timezone)} icon={<BsSunrise size={20} />} label={"Sunrise"} className="bg-yellow-300/40" />
                                            <CurrentCard val={formatTime(weather?.sys?.sunset, weather?.timezone)} icon={<BsSunset size={20} />} label={"Sunset"} className="bg-orange-300/60" />
                                        </div>
                                    </div >
                                </>
                            ) : (
                                <>
                                    {/* IF NOT WEATHER DATA */}
                                    <div className='w-full h-full flex flex-col items-center justify-center gap-4 text-center duration-100'>

                                        {/* ICON */}
                                        <div className='p-6 rounded-full shadow-[inset_6px_6px_12px_#cfcfcf,inset_-6px_-6px_12px_#ffffff]'>
                                            <CiLocationOn size={40} className='text-gray-500' />
                                        </div>

                                        {/* TEXT */}
                                        <div>
                                            <h1 className='text-gray-700 text-xl font-bold'>
                                                No Weather Info
                                            </h1>
                                            <p className='text-gray-500 text-sm mt-1'>
                                                Search for a city to see the weather 🌤️
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </>
                )}
            </>
        )
    }

}

export default Current
