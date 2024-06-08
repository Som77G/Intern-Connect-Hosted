import { useState, useEffect } from "react"
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAdminContext } from "../hooks/useAdminContext";
import UseSocketSetup from "../hooks/UseSocketSetup";
import StudentDashboard from "./student/StudentDashboard";
import { toast } from 'react-toastify';
import { useNewMessageContext } from "../hooks/useNewMessageContext";
import image from "../assets/home.svg";

axios.defaults.withCredentials = true;

const PORT = import.meta.env.VITE_DOMAIN;


export default function Login() {
    const { user: loginUser, dispatch } = useAdminContext();
    const {hasNewMessage, dispatch: dispatch_hasNewMessage}= useNewMessageContext();
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: "",
        password: "",
        userType: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const createStudentProfile = async(userid) => {
        try {
            const response = await axios.post(`${PORT}/api/student/createProfile`, {userid});
            console.log("Profile created successfully: ", response.data.user)
        } catch (error) {
            console.log("Error in creating Profile: ", error)
        }
    }
    const createAdminProfile = async(userid) => {
        try {
            const response = await axios.post(`${PORT}/api/admin/createProfile`, {userid});
            console.log("Profile created successfully: ", response.data.user)
        } catch (error) {
            console.log("Error in creating Profile: ", error)
        }
    }

    const onLogin = async () => {
        try {

            setLoading(true);
            const response = await axios.post(`${PORT}/api/user/login`, user);
            console.log("bit: ", response.data.message.resetpassword);
            const message = response.data.message;
            const type = response.data.userType

            // if (message.resetpassword !== 0) {
            //     if (user.userType == 'student') {
            //         navigate('/student-dashboard')
            //     }
            //     else if (user.userType == 'admin') {
            //         navigate('/admin-dashboard')
            //     }
            // }
            console.log("User of login: ", type);
            const loginUser = { userid: message.userid, username: message.username, userType: type, profileCreated : message.profilecreated, profileBlocked : message.profileblocked }
            
            if (message.resetpassword != 0) {
                toast.success("Login Successful")
                await dispatch({ type: "LOGIN", payload: loginUser })
                if (type == 'student') {
                    console.log("Redirecting....")
                    navigate('/student-dashboard')
                }
            }
            if (message.resetpassword == 0) {
                toast.success("Mail has been sent")
                if (message.profilecreated == 0) {
                    //create profile
                    if (type == 'student') {
                        createStudentProfile(loginUser.userid);
                    }
                    if (type == 'admin') {
                        createAdminProfile(loginUser.userid);
                    }
                }
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Login failed", error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        if (user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
            

        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    useEffect(() => {
        console.log("Rerendered login")
    }, [loginUser]);

    return (
        <>
            {!loginUser && (
                <div className="bg-zinc-900 h-screen w-screen">
                    <nav  className="flex justify-between py-4 px-10 shadow-2xl" >
                    <div className="text-3xl font-bold text-purple-600">SIP Portal</div>
                        <NavLink to="/" className="bg-yellow-500 text-black py-2 px-6 rounded-2xl hover:bg-yellow-600">Home</NavLink>
                    </nav>
                    <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
                        <div
                            className="flex rounded-lg shadow-xl shadow-zinc-950 w-full sm:w-3/4 lg:w-1/2 bg-zinc-900 sm:mx-0"
                            style={{ height: '600px' }}
                        >
                            <div className="flex flex-col w-full md:w-1/2 p-4">
                                <div className="flex flex-col flex-1 justify-center mb-8">
                                    <h1 className="text-5xl text-center font-thin">Welcome !</h1>
                                    <div className="w-full mt-4">
                                        <h1 className="text-center">{loading ? "Processing..." : ""}</h1>

                                        <div className="form-horizontal w-3/4 mx-auto">
                                            <div className="flex justify-evenly">
                                                <div className="flex items-center mt-4">
                                                    <input
                                                        type="radio"
                                                        id="student"
                                                        name="userType"
                                                        value="student"
                                                        checked={user.userType === 'student'}
                                                        onChange={(e) => setUser({ ...user, userType: e.target.value })}
                                                        className="appearance-none h-3 w-3 border border-gray-400 rounded-full checked:bg-blue-400 checked:border-blue-900"

                                                    />
                                                    <label htmlFor="student" className="flex items-center cursor-pointer ml-2">
                                                        <span className="text-sm text-grey-dark">Student</span>

                                                    </label>
                                                </div>
                                                <div className="flex items-center mt-4">
                                                    <input
                                                        type="radio"
                                                        id="admin"
                                                        name="userType"
                                                        value="admin"
                                                        checked={user.userType === 'admin'}
                                                        onChange={(e) => setUser({ ...user, userType: e.target.value })}
                                                        className="appearance-none h-3 w-3 border border-gray-400 rounded-full checked:bg-blue-400 checked:border-blue-900"
                                                    />
                                                    <label htmlFor="admin" className="flex items-center cursor-pointer ml-2">
                                                        <span className="text-sm text-grey-dark">Admin</span>
                                                    </label>                                                
                                                </div>
                                            </div>

                                            <div className="flex flex-col mt-4">
                                                <input
                                                    id="username"
                                                    type="text"
                                                    value={user.username}
                                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                                                    placeholder="username"
                                                    className="text-black flex-grow h-8 px-2 border rounded border-grey-400"

                                                />
                                            </div>
                                            <div className="flex flex-col mt-4">
                                                <input
                                                    id="password"
                                                    type="password"
                                                    value={user.password}
                                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                                    placeholder="password"
                                                    required
                                                    className="text-black flex-grow h-8 px-2 rounded border border-grey-400"

                                                />
                                            </div>

                                            <div className="flex flex-col mt-8">
                                                <button
                                                    disabled={buttonDisabled}
                                                    onClick={onLogin}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded"
                                                >
                                                    Login
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-center mt-4">
                                            <NavLink
                                                className="no-underline hover:underline text-blue-dark text-xs"
                                                to='/request-admin'
                                            >
                                                Forgot Your Password?
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="hidden md:block md:w-1/2 rounded-r-lg"
                                style={{
                                    background: `url(${image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
            {loginUser && <UseSocketSetup />}
        </>
    );

}

{/* <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>{loading ? "Processing" : "Login"}</h1>
                <hr />
                <label htmlFor="userType">UserType</label>
                <select
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="userType"
                    value={user.userType}
                    onChange={(e) => setUser({ ...user, userType: e.target.value })}
                >
                    <option value="">Select UserType</option>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>
                <label htmlFor="username">username</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="username"
                />

                <label htmlFor="password">password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                />



                <button
                    onClick={onLogin}
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No Login" : "Login"}</button>
            </div> */}

