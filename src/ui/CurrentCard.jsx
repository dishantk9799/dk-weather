const CurrentCard = ({ val, icon, label, className = "" }) => {
    return (
        <div className={`w-full p-4 hover:scale-[1.02] transition duration-200 rounded-2xl shadow-[4px_4px_8px_#cfcfcf,-4px_-4px_8px_#ffffff] ${className}`}>
            {/* Top Row */}
            <div className="flex items-center gap-2">
                <div className="p-2 text-gray-600 rounded-full shadow-[4px_4px_8px_#cfcfcf,-4px_-4px_8px_#ffffff]">
                    {icon}
                </div>
                <p className="text-md text-gray-600 font-semibold">{label}</p>
            </div>

            {/* Value */}
            <h2 className="mt-4 text-gray-700 text-center text-2xl font-extrabold">
                {val}
            </h2>
        </div>
    )
}

export default CurrentCard
