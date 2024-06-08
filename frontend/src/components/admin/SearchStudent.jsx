import axios from "axios";
import { useState } from "react";
import StudentProfile from './StudentProfile'
const PORT = import.meta.env.VITE_DOMAIN;

export default function SearchStudent() {
    const [result, setResult] = useState('')
    const [input, setInput] = useState('')
    const [fetched, setFetched] = useState('')
    const [loading, setLoading] = useState(false);
    const loadProfile = async (student) => {
        try {
            console.log("Profile loaded")
            setResult('')
            setLoading(true)

            const response = await axios.get(`${PORT}/api/student/dashboard?userid=${encodeURIComponent(student.userid)}`)
            const profile = response.data.message
            console.log("Profile fetched", profile)
            setFetched(profile)

        } catch (error) {
            console.log("Error in fetching profile", error)
        } finally {
            setLoading(false)
        }
    }

    const onSearchApi = async (e) => {
        console.log("Fetching, ..", e)

        try {
            const response = await axios.get(`${PORT}/api/user/searchStudent?username=${encodeURIComponent(e)}`)
            const matchArray = response.data.users;

            setResult(matchArray)
            console.log(matchArray)
        } catch (error) {
            console.log("Error in search bar", error)
        }

    }
    let timer;
    //calling the api when the the gap between tweo key presses is >= delay
    const debouncingFunction = (fn, e, delay) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            onSearchApi(e)
        }, delay)
    }
    const handleChange = (e) => {
        debouncingFunction(onSearchApi, e, 500)
    }
    return (
        <>
            <div className="mx-auto flex flex-col w-4/5 mt-10">
                <input
                    type='text'
                    placeholder='Search Student by username'
                    onKeyUp={(e) => handleChange(e.target.value)}
                    className="px-4 rounded py-2 text-black"
                />

                {result && result.length > 0 && (
                    <div className="bg-white rounded">
                        {result.map((student, index) => {
                            return (
                                <div key={student.userid || index}>
                                    <button
                                        className='my-2 ml-3 text-black'
                                        onClick={(e) => loadProfile(student)}
                                    >{student.username}</button>
                                </div>
                            )
                        })}
                    </div>
                )}
                {loading && (
                    <div className='flex flex-col justify-center items-center bg-zinc-900 h-screen'>
                        <div className='flex flex-row space-x-2'>
                            <span className='sr-only'>Loading...</span>
                            <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                            <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                            <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
                        </div>
                        <br />
                        <div className='text-xl font-mono font-semibold text-gray-200'>Loading Profile ...</div>
                    </div>
                )}
                {fetched && !loading && (
                    <StudentProfile profile={fetched} />
                )}
                {!fetched && !loading && (
                    <div className='flex flex-col justify-center items-center h-screen'>
                    <div className='flex flex-row space-x-2'>
                        <span className='sr-only'>Loading...</span>
                        <div className='h-8 w-8 bg-white rounded-full animate-none [animation-delay:-1s]'></div>
                        <div className='h-8 w-8 bg-white rounded-full animate-none [animation-delay:-1s]'></div>
                        <div className='h-8 w-8 bg-white rounded-full animate-none'></div>
                    </div>
                    <br />
                    <div className='text-xl font-mono font-semibold text-gray-200'>Search to see Profile</div>
                </div>
                )}
            </div>




        </>
    )
}