import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from "../hooks/useAdminContext";
import { toast } from 'react-toastify';
import { MdError } from "react-icons/md";

const PORT = import.meta.env.VITE_DOMAIN;

export default function ResetPassword() {
    const { user: loginUser, dispatch } = useAdminContext();

    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [verifying, setVerifying] = useState(false)
    const [error, setError] = useState(false)
    const [userType, setUserType] = useState("")
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);


    const verifyUserEmail = async () => {
        try {
            const response = await axios.post(`${PORT}/api/user/verifyEmail`, { token, userType })
            const data = response.data
            console.log(data);
            setUsername(data.user.username);

            // setVerified(true)
        } catch (error) {
            setError(true)
            console.log(error.response.data)
        } finally {
            setLoading(true)
        }
    }

    useEffect(() => {
        try {
            const url = window.location.search.split("=");
            const token = url[1].split('&')[0]

            const userType = url[2]
            setToken(token || "");
            setUserType(userType);
        } catch (error) {
            setLoading(true);
            setError(true)
        }
    }, [])
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    const onReset = async () => {
        try {
            setVerifying(true)
            const response = await axios.put(`${PORT}/api/user/resetPassword`, { username, password, userType });
            const message = response.data.message;
            console.log("updated password", response)
            //const loginUser = { userid: message.userid, username: message.username, userType: type }
            // dispatch({ type: "LOGIN", payload: loginUser })
            // if (userType == 'student') {
            //     navigate('/student-dashboard')
            // }
            // else{
            //     navigate('/admin-dashboard')
            // }
            toast.success("Password has been set")
        } catch (error) {
            setError(true);
            console.log(error.response)
        } finally {
            setVerifying(false)
            setButtonDisabled(false)

        }
    }

    useEffect(() => {
        if (password.length == 0 || password !== confirmPassword) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [confirmPassword])
    return (
        <>
            {!loading && (
                <div className='flex flex-col justify-center items-center bg-zinc-900 h-screen'>
                    <div className='flex flex-row space-x-2'>
                        <span className='sr-only'>Loading...</span>
                        <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
                        <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
                        <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
                    </div>
                    <br />
                    <div className='text-xl font-mono font-semibold text-gray-200'>Verifying Token ...</div>
                </div>
            )}
            {loading && !error && (

                <div className='bg-zinc-900 h-screen w-screen'>
                    <nav className="flex justify-between py-4 px-10 shadow-2xl" >
                        <div className="text-3xl font-bold text-purple-600">SIP Portal</div>
                    </nav>

                    <div className="flex justify-center items-center">

                        <div className="mx-auto my-20">
                            <div className="px-20 md:px-20 py-10 my-4 rounded-lg shadow-xl shadow-zinc-950">
                                <div className="flex flex-col">
                                    <h1 className="font-bold uppercase text-3xl text-center">Reset Password</h1>
                                    <h1 className='text-center'>{verifying ? "Processing..." : ""}</h1>
                                </div>
                                <div className="flex flex-col mt-6">
                                    <label htmlFor="password" className='font-light my-4'>New Password :</label>
                                    <input className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        required
                                        placeholder="New Password" />

                                    <label htmlFor="confirmPassword" className='font-light my-4'>Confirm Password :</label>
                                    <input className="w-full bg-gray-100 text-gray-900 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type="password"
                                        required
                                        placeholder="consfirm Password" />

                                </div>


                                <div className="mt-10 w-4/6 mx-auto">
                                    <button className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                          focus:outline-none focus:shadow-outline"
                                        disabled={!buttonDisabled}
                                        onClick={onReset}>
                                        Reset Password
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            )}

            {loading && error && (
                <>
                    <div className='flex flex-col justify-center items-center bg-zinc-900 h-screen'>
                        <MdError className='text-7xl' />
                        <br />
                        <div className='text-2xl font-mono font-semibold text-gray-200'>Token Expired :(</div>
                    </div>


                </>
            )}
        </>
    )
}