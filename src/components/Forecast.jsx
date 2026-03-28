import { LuCalendar, LuSearchX } from "react-icons/lu";
import { LuSun, LuCloud, LuCloudRainWind, LuCloudSun } from "react-icons/lu";
import ForecastCard from '../ui/ForecastCard';
import { CiLocationOn } from 'react-icons/ci';
import { IoWarning } from 'react-icons/io5';
const Forecast = ({ forecast, error, loading }) => {
    const formatDay = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const capitalize = (text) => text?.charAt(0).toUpperCase() + text?.slice(1);

    const getIcon = (main) => {
        if (main?.includes("Rain")) return <LuCloudRainWind size={20} />;
        if (main?.includes("Cloud")) return <LuCloud size={20} />;
        if (main?.includes("Clear")) return <LuSun size={20} />;
        return <LuCloudSun size={20} />;
    };

    const dailyForecast = forecast?.list?.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

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
                        {forecast ? (
                            <>
                                <div className='p-4 lg:p-6 flex flex-col gap-10 duration-100'>

                                    {/* TITLE */}
                                    <div className='flex items-center gap-2 text-gray-700'>
                                        <span className='p-2 lg:p-3 shadow-[4px_4px_8px_#cfcfcf,-4px_-4px_8px_#ffffff] rounded-lg'><LuCalendar size={20} /></span>
                                        <h1 className='md:text-2xl text-lg font-extrabold'>5 Day Forecast</h1>
                                    </div>

                                    {/* CRADS */}
                                    <div className='flex flex-col gap-4'>
                                        {dailyForecast?.map((item, index) => (
                                            <ForecastCard
                                                key={index}
                                                icon={getIcon(item.weather[0].main)}
                                                day={index === 0 ? "Today" : formatDay(item.dt_txt)}
                                                sky={capitalize(item.weather[0].description)}
                                                humidity={`${item.main.humidity}%`}
                                                temp={`${Math.round(item.main.temp)}°`}
                                                feelLike={`${Math.round(item.main.feels_like)}°`}
                                            />
                                        ))}
                                    </div>
                                </div>
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
                        )}
                    </>
                )}
            </>
        )
    }

}

export default Forecast
