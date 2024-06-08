import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminContext } from '../../hooks/useAdminContext';
import UseSocketSetup from '../../hooks/UseSocketSetup';
import getSocketInstance from '../../socket';
import { toast } from 'react-toastify';

import { FaMapMarkerAlt, FaPhoneAlt, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';


const PORT = import.meta.env.VITE_DOMAIN;
axios.defaults.withCredentials= true;

const schema = yup.object().shape({
    username: yup.string().required('Username is required').max(50, 'Username must be at most 50 characters'),
    message: yup.string()
        .required('Message is required')
        .max(255, 'Message must be at most 255 characters')
});
export default function RequestToAdmin() {
    const navigate = useNavigate();

    const { user, dispatch } = useAdminContext();
    const [submitting, setSubmitting] = useState(false);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const messageObject={to_username: "admin01", from_username:username, message: message};
    useEffect(()=>{
         console.log("helllo buddy")
         try{
         if (user) {
            console.log("inside socket functionality");
            const socket= getSocketInstance();
         socket.connect();
         socket.emit("message_sent", messageObject);
         toast.success("Message sent")
         // console.log(state);
         console.log("Running")

         //save message within the database
         const response = axios.post(`${PORT}/api/anonymous/reset_password_message`, messageObject);
         console.log("Message is being saved");
         }
        }catch(error){
            toast.error("Failed to send Message");
            console.log("message failed to save");
        }
    }, [user])

    const onSubmit = async () => {
        setSubmitting(true);
        console.log("hello onsubmit ");
        // Here you can perform actions like submitting the form data to an API
        try {
            setError(null)
            // const data = await axios.post(`${PORT}/api/admin/addstudent`, { username, password, email })
            // navigate('/admin-dashboard')

            const res = await axios.post(`${PORT}/api/user/validUser`, { username })
            console.log("User validated")
            const user = { username: username, message: message, userType: "student" };

            dispatch({ type: "LOGIN", payload: user });

        } catch (error) {
            toast.error("Not a valid username")

            console.log("Not a valid username: ", error.message);
        }
        finally {
            setSubmitting(false);
            // setUsername('')
            // setMessage('')
        }
    };

    return (
        <>
            {!user &&
                <div>
                    <nav  className="flex justify-between py-4 px-10 shadow-2xl shadow-zinc-950" >
                    <div className="text-3xl font-bold text-purple-600">SIP Portal</div>
                        <NavLink to="/" className="bg-yellow-500 text-black py-2 px-6 rounded-2xl hover:bg-yellow-600">Home</NavLink>
                    </nav>
                <div className="flex justify-center items-center">
                    
                    <div className="container mx-auto my-28 px-4 lg:px-20">
                        <div className="p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl shadow-zinc-950">
                            <div className="flex">
                                <h1 className="font-bold uppercase text-3xl">Request Admin to reset <br /> Password</h1>
                            </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                                <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    id="name"
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    type="text"
                                    required
                                    placeholder="First Name*" />
                                <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    id="name"
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)}
                                    type="text"
                                    required
                                    placeholder="Last Name*" />
                                <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    required
                                    placeholder="Email*" />
                                <input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    placeholder="Registration No.*" />
                            </div>
                            {errors && errors.username && (
                                <p className="text-red-500 text-xs italic">{errors.username.message}</p>
                            )}
                            <div className="my-4">
                                <textarea
                                    placeholder="Message*"
                                    className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}></textarea>
                            </div>
                            {errors && errors.message && (
                                <p className="text-red-500 text-xs italic">{errors.message.message}</p>
                            )}
                            <h3 className="mb-2 text-gray-400">{submitting? <i>Processing...</i> : ""}</h3>
                            <div className="my-2 w-1/2 lg:w-1/4">
                                <button className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                          focus:outline-none focus:shadow-outline"
                                    onClick={onSubmit}
                                    disabled={submitting}>
                                    Send Message
                                </button>
                            </div>
                        </div>

                        <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
                            <div className="flex flex-col text-white">
                                <h1 className="font-bold uppercase text-4xl my-4">Drop in our office</h1>
                                {/* <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt arcu diam,
                                    eu feugiat felis fermentum id. Curabitur vitae nibh viverra, auctor turpis sed, scelerisque ex.
                                </p> */}

                                <div className="flex my-4 w-2/3 lg:w-1/2">
                                    <div className="flex flex-col">
                                        <FaMapMarkerAlt className="pt-2 pr-2" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-2xl">TPO Office</h2>
                                        <p className="text-gray-400">Tpo Department, Admininstraation Building, MNNIT Allahabad</p>
                                    </div>
                                </div>

                                <div className="flex my-4 w-2/3 lg:w-1/2">
                                    <div className="flex flex-col">
                                        <FaPhoneAlt className="pt-2 pr-2" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-2xl">Call Us</h2>
                                        <p className="text-gray-400">Tel: 6387-530</p>
                                        <p className="text-gray-400">Fax: 9026-699</p>
                                    </div>
                                </div>

                                <div className="flex my-4 w-2/3 lg:w-1/2">
                                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1">
                                        <FaFacebookF className="text-blue-900" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/somesh-gupta-sg74/" target="_blank" rel="noreferrer" className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1">
                                        <FaLinkedinIn className="text-blue-900" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            }

            {user && <UseSocketSetup />}
        </>
    )
}

