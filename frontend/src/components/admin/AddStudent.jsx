import { useForm, useFormState } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import axios from 'axios';
import { Form, useNavigate } from 'react-router-dom';
import student from "../../assets/student.png"
import { toast } from 'react-toastify';
const PORT = import.meta.env.VITE_DOMAIN;

const schema = yup.object().shape({
    username: yup.string().required('Username is required').max(50, 'Username must be at most 50 characters'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').max(255, 'Password must be at most 255 characters'),
    email: yup.string().email('Invalid email').required('Email is required').max(50, 'Email must be at most 50 characters')
});
export default function AddStudent() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [verifying, setVerifying] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async () => {
        setSubmitting(true);
        setVerifying(true)
        console.log("hello onsubmit ");
        // Here you can perform actions like submitting the form data to an API
        try {
            const data = await axios.post(`${PORT}/api/admin/addstudent`, { username, password, email })
            // navigate('/admin-dashboard')
            toast.success("Student added successfully!");
            console.log(data);
        } catch (error) {
            toast.error("Error in Adding Student");
            console.log("error in adding student: ", error.message);
        }
        finally {
            setSubmitting(false);
            setVerifying(false);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">

                <div className="mx-4 w-full">
                    <div className=" px-16 py-10 my-4 bg-zinc-900 rounded-lg">
                        <div className="flex flex-col">
                            <h1 className="font-bold uppercase text-3xl text-center">Add Student</h1>
                            <h1 className='text-center'>{verifying ? "Processing..." : ""}</h1>
                        </div>
                        <div className="flex flex-col mt-6">
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <label htmlFor="username" className="text-xs font-semibold px-1">Username</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                        <input type="text"
                                            // id="username"
                                            // value={username}
                                            {...register("username")}
                                            onChange={(e) => setUsername(e.target.value)} className="w-full -ml-10 pl-2 pr-3 py-2 text-black rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Registration Number" />
                                        {errors && errors.username && (
                                            <p className="text-red-500 text-xs bold mt-1">
                                                <span className="inline-block bg-red-200 text-red-700 rounded-full px-2 py-1">
                                                    {errors.username.message}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <label htmlFor="password" className="text-xs font-semibold px-1">Password</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                        <input
                                            // id="password"
                                            type="password"
                                            // value={password}
                                            {...register("password")}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="text-black w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Dummy Password" />
                                        {errors && errors.password && (
                                            <p className="text-red-500 text-xs bold mt-1">
                                                <span className="inline-block bg-red-200 text-red-700 rounded-full px-2 py-1">
                                                    {errors.password.message}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-12">
                                <label htmlFor="email" className="text-xs font-semibold px-1">Email</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                    <input
                                        // id="email"
                                        type="email"
                                        // value={email}
                                        {...register("email")}
                                        onChange={(e) => setEmail(e.target.value)} className="text-black w-full -ml-10 pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Test@123@gmail.com" />
                                    {errors && errors.email && (
                                        <p className="text-red-500 text-xs bold mt-1">
                                            <span className="inline-block bg-red-200 text-red-700 rounded-full px-2 py-1">
                                                {errors.email.message}
                                            </span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="mt-10 w-4/6 mx-auto">
                            <button className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
  focus:outline-none focus:shadow-outline"
                                type='submit'
                                disabled={submitting}
                            >
                                ADD Record
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </form>
    )
}