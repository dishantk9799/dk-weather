import { WiHumidity } from 'react-icons/wi'

const ForecastCard = ({ icon, day, sky, humidity, temp, feelLike }) => {
  return (
    <div className="w-full p-6 flex items-center justify-between cursor-pointer hover:scale-[1.02] transition duration-200 rounded-2xl shadow-[4px_4px_8px_#cfcfcf,-4px_-4px_8px_#ffffff]">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-3">

        {/* ICON */}
        <div className="p-2 rounded-full text-gray-600 shadow-[4px_4px_8px_#cfcfcf,-4px_-4px_8px_#ffffff]">
          {icon}
        </div>

        {/* DAY AND SKY */}
        <div>
          <p className="text-gray-700 font-semibold">{day}</p>
          <p className="text-gray-500 text-sm">{sky}</p>
        </div>
      </div>

      {/* CENTER */}
      <div className="hidden md:flex items-center gap-1 text-gray-500 text-sm">
        <span><WiHumidity size={20} /></span> {humidity}
      </div>

      {/* RIGHT SECTION */}
      <div className="text-right">
        <p className="text-xl font-bold text-gray-700">{temp}</p>
        <p className="text-sm text-gray-500">{feelLike}</p>
      </div>
    </div>
  )
}

export default ForecastCard
