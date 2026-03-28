import { useForm } from 'react-hook-form';
import { CiLocationOn } from "react-icons/ci";
const Search = ({ setCity, loading }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const submit = (data) => {
        setCity(data.city);
        reset();
    }

    return (
        <>
            <form onSubmit={handleSubmit(submit)} className="flex mt-2 items-center gap-2">
                <div className="relative flex flex-col justify-center">

                    {/* INPUT */}
                    <input
                        {...register("city", {
                            required: "City name is required",
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "Only letters allowed"
                            }
                        })}
                        placeholder="e.g., Mumbai"
                        className="px-3 py-1.5 md:py-2.5 pr-8 md:w-96 focus:bg-zinc-300/40 duration-200 rounded-lg shadow-[4px_4px_8px_#cfcfcf,-4px_-4px_8px_#ffffff] text-gray-600 text-sm border-none outline-none"
                        type="text"
                    />
                    <CiLocationOn className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" size={15} />
                </div>

                {/* SEARCH BUTTON */}
                <button
                    className="min-w-[100px] h-[32px] md:h-[40px] flex items-center justify-center px-3 md:px-4 text-gray-700 rounded-lg shadow-[4px_4px_8px_#cfcfcf,-4px_-4px_8px_#ffffff] hover:bg-zinc-300/40 focus:bg-zinc-300/40 duration-200 cursor-pointer"
                    type="submit"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-4 border-gray-500 border-t-gray-700 rounded-full animate-spin duration-100"></div>
                    ) : (
                        "Search"
                    )}
                </button>
            </form>

            {/* Error Message */}
            {errors.city ? <p className="text-red-500 animate-pulse text-[10px] font-semibold ml-1">{errors.city.message}</p> : <p className='text-[10px] opacity-0'>s</p>}
        </>
    )
}

export default Search
