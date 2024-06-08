import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAdminContext } from "../../hooks/useAdminContext";
import { useNavigate } from "react-router-dom";
import { FaCheck } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import AdminHeader from "../admin/AdminHeader";
import AdminNavbar from "../admin/AdminNavbar";
import { useMyJobsContext } from "../../hooks/useMyJobsContext";

axios.defaults.withCredentials = true;
const PORT = import.meta.env.VITE_DOMAIN;

export default function MyJobs() {
    // const [myJobs, setMyJobs] = useState([]);
    const [editingMode, setEditingMode] = useState(null);
    const [tempJobData, setTempJobData] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = useAdminContext();
    const {myJobs, dispatch}= useMyJobsContext();
    const navigateTo = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                console.log("Fetching admin jobs");
                const { data } = await axios.get(`${PORT}/api/job/getMyJobs`, {
                    withCredentials: true
                });
                console.log("Received admin jobs");
                console.log("data of jobs", data.myJobs);

                await dispatch({type: 'SET_MYJOBS', payload: data.myJobs});
                setLoading(false)
            } catch (error) {
                console.log("Error at fetching my jobs", error);
                toast.error(error.response.data.message);
                dispatch({type:'default'});
            }
        };
        if (user) {
            fetchJobs();
        }
        if ((user && user.userType !== 'admin')) {
            navigateTo("/");
        }
    }, [user]);

    const handleEnableEdit = (jobId) => {
        const job = myJobs.find((job) => job.id === jobId);
        setTempJobData(job);
        setEditingMode(jobId);
    };

    const handleDisableEdit = () => {
        setEditingMode(null);
        setTempJobData({});
    };

    const handleUpdateJob = async (jobId) => {
        setIsUpdating(true);
        try {
            console.log("updating job");
            const updatedJob = myJobs.find((job) => job.id === jobId);
            const response = await axios.put(`${PORT}/api/job/updateJob/${jobId}`, tempJobData, {
                withCredentials: true
            });
            console.log("Job updated successfully", response);

            // setMyJobs((prevJobs) =>
            //     prevJobs.map((job) =>
            //         job.id === jobId ? { ...job, ...tempJobData } : job
            //     )
            // );
            await dispatch({type:'UPDATE_MYJOB', payload:tempJobData});

            toast.success(response.data.message);
            setEditingMode(null);
            setTempJobData({});
        } catch (error) {
            console.log("error at updating job", error);
            toast.error(error.response.data.message);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteJob = async (jobId) => {
        setIsDeleting(true);
        try {
            console.log("deleting job");
            const response = await axios.delete(`${PORT}/api/job/deleteJob/${jobId}`, {
                withCredentials: true
            });
            console.log("job deleted successfully", response);
            await dispatch({type:'DELETE_MYJOB', payload: jobId});
            toast.success(response.data.message);
            // setMyJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
        
        } catch (error) {
            console.log("error at deleting job", error.response);
            toast.error(error.response.data.message);
        } finally {
            setIsDeleting(false);
        }
    };
    
    // const handleInputChange = (jobId, field, value) => {
    //     console.log("field ", "value", field, value);
    //     setTempJobData((prevData) => ({
    //         ...prevData,
    //         [field]: value
    //     }));
    // };
    const handleInputChange = (jobId, field, value) => {
        
        setTempJobData((prevData) => ({
            ...prevData,
            [field]: field === 'expired' ? (value === 'true' ? true : false) : value
        }));
    };

    return (
        <>
            <AdminHeader />
            <section className="flex flex-col md:flex-row lg:flex-row py-1 bg-blueGray-50">
                <AdminNavbar />
                
            
            <div className="w-full px-10 bg-zinc-900 py-8">
                <div className="w-full mx-auto px-4">
                    <h1 className="text-3xl text-center font-bold text-white">Your Posted Jobs</h1>
                    <hr className="my-6"/>
                    {isUpdating && (
                        <p className="text-yellow-500 mb-4">Updating job, please wait...</p>
                    )}
                    {isDeleting && (
                        <p className="text-yellow-500 mb-4">Deleting job, please wait...</p>
                    )}
                    {loading ? (
                        <>
                            <div className='w-full flex flex-col justify-center items-center h-screen'>
                                        <div className='flex flex-row space-x-2'>
                                            <span className='sr-only'>Loading...</span>
                                            <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                            <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                            <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
                                            <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
                                            <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
                                        </div>
                                        <br />
                                        <div className='text-xl font-mono font-semibold text-gray-200'>Loading Your Jobs ...</div>
                                    </div>
                        </>
                    ) : (
                        myJobs && myJobs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {myJobs.map((element) => (
                                    <div key={element.id} className="card bg-zinc-900 shadow-md shadow-zinc-950 rounded-lg p-6 text-white">
                                        <div className="content">
                                            <div className="short_fields mb-4">
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-400">Title:</label>
                                                    {editingMode === element.id ? (
                                                        <input
                                                            type="text"
                                                            disabled={editingMode !== element.id}
                                                            value={tempJobData.title}
                                                            onChange={(e) => handleInputChange(element.id, "title", e.target.value)}
                                                            className="mt-1 block w-full rounded-md bg-zinc-900 border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
                                                        />
                                                    ) : (
                                                        <p className="mt-1 block w-full sm:text-sm text-white bg-zinc-900 p-2 rounded-md border border-gray-600">
                                                            {element.title}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-400">Country:</label>
                                                    {editingMode === element.id ? (
                                                        <input
                                                            type="text"
                                                            disabled={editingMode !== element.id}
                                                            value={tempJobData.country}
                                                            onChange={(e) => handleInputChange(element.id, "country", e.target.value)}
                                                            className="mt-1 block w-full rounded-md bg-zinc-900 border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
                                                        />
                                                    ) : (
                                                        <p className="mt-1 block w-full sm:text-sm text-white bg-zinc-900 p-2 rounded-md border border-gray-600">
                                                            {element.country}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-400">City:</label>
                                                    {editingMode === element.id ? (
                                                        <input
                                                            type="text"
                                                            disabled={editingMode !== element.id}
                                                            value={tempJobData.city}
                                                            onChange={(e) => handleInputChange(element.id, "city", e.target.value)}
                                                            className="mt-1 block w-full rounded-md bg-zinc-900 border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
                                                        />
                                                    ) : (
                                                        <p className="mt-1 block w-full sm:text-sm text-white bg-zinc-900 p-2 rounded-md border border-gray-600">
                                                            {element.city}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-400">Category:</label>
                                                    {editingMode === element.id ? (
                                                        <select
                                                            value={tempJobData.category}
                                                            onChange={(e) => handleInputChange(element.id, "category", e.target.value)}
                                                            disabled={editingMode !== element.id}
                                                            className="mt-1 block w-full rounded-md bg-zinc-900 border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
                                                        >
                                                            <option value="Graphics & Design">Graphics & Design</option>
                                                            <option value="Mobile App Development">Mobile App Development</option>
                                                            <option value="Frontend Web Development">Frontend Web Development</option>
                                                            <option value="MERN Stack Development">MERN STACK Development</option>
                                                            <option value="Account & Finance">Account & Finance</option>
                                                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                                                            <option value="Video Animation">Video Animation</option>
                                                            <option value="MEAN Stack Development">MEAN STACK Development</option>
                                                            <option value="MEVN Stack Development">MEVN STACK Development</option>
                                                            <option value="Data Entry Operator">Data Entry Operator</option>
                                                        </select>
                                                    ) : (
                                                        <p className="mt-1 block w-full sm:text-sm text-white bg-zinc-900 p-2 rounded-md border border-gray-600">
                                                            {element.category}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-400">Salary:</label>
                                                    {editingMode === element.id ? (
                                                        <>
                                                            {tempJobData.fixedSalary !== null && tempJobData.fixedSalary !== undefined ? (
                                                                <input
                                                                    type="number"
                                                                    disabled={editingMode !== element.id}
                                                                    value={tempJobData.fixedSalary}
                                                                    onChange={(e) => handleInputChange(element.id, "fixedSalary", e.target.value)}
                                                                    className="mt-1 block w-full rounded-md bg-zinc-900 border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
                                                                />
                                                            ) : (
                                                                <div className="flex space-x-2">
                                                                    <input
                                                                        type="number"
                                                                        disabled={editingMode !== element.id}
                                                                        value={tempJobData.salaryFrom}
                                                                        onChange={(e) => handleInputChange(element.id, "salaryFrom", e.target.value)}
                                                                        className="mt-1 block w-full rounded-md bg-zinc-900 border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
                                                                    />
                                                                    <input
                                                                        type="number"
                                                                        disabled={editingMode !== element.id}
                                                                        value={tempJobData.salaryTo}
                                                                        onChange={(e) => handleInputChange(element.id, "salaryTo", e.target.value)}
                                                                        className="mt-1 block w-full rounded-md bg-zinc-900 border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
                                                                    />
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {element.fixedSalary !== null && element.fixedSalary !== undefined ? (
                                                                <p className="mt-1 block w-full sm:text-sm text-white bg-zinc-900 p-2 rounded-md border border-gray-600">
                                                                    {element.fixedSalary}
                                                                </p>
                                                            ) : (
                                                                <div className="flex space-x-2">
                                                                    <p className="mt-1 block w-full sm:text-sm text-white bg-zinc-900 p-2 rounded-md border border-gray-600">
                                                                        {element.salaryFrom}
                                                                    </p>
                                                                    <p className="mt-1 block w-full sm:text-sm text-white bg-zinc-900 p-2 rounded-md border border-gray-600">
                                                                        {element.salaryTo}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">Expired:</label>
                                                    {editingMode === element.id ? (
                                                        <select
                                                            value={tempJobData.expired}
                                                            onChange={(e) => handleInputChange(element.id, "expired", e.target.value)}
                                                            className="mt-1 block w-full rounded-md bg-zinc-900 border border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-white"
                                                        >
                                                            {tempJobData.expired == true? (<>
                                                                <option value={true}>TRUE</option>
                                                                <option value={false}>FALSE</option>
                                                            </>) : (<>
                                                                <option value={false}>FALSE</option>
                                                            <option value={true}>TRUE</option>
                                                            </>)}
                                                            
                                                        </select>
                                                    ) : (
                                                        <p className="mt-1 block w-full sm:text-sm text-white bg-zinc-900 p-2 rounded-md border border-gray-600">
                                                            {element.expired ? "TRUE" : "FALSE"}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="long_field mb-4">
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-400">Description:</label>
                                                    <textarea
                                                        rows={5}
                                                        value={editingMode === element.id ? tempJobData.description : element.description}
                                                        disabled={editingMode !== element.id}
                                                        onChange={(e) => handleInputChange(element.id, "description", e.target.value)}
                                                        className="mt-1 block w-full rounded-md bg-zinc-900 border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-400">Location:</label>
                                                    <textarea
                                                        rows={5}
                                                        value={editingMode === element.id ? tempJobData.location : element.location}
                                                        disabled={editingMode !== element.id}
                                                        onChange={(e) => handleInputChange(element.id, "location", e.target.value)}
                                                        className="mt-1 block w-full rounded-md bg-zinc-900 border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="button_wrapper flex justify-between items-center mt-4">
                                            <div className="edit_btn_wrapper flex space-x-2">
                                                {editingMode === element.id ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleUpdateJob(element.id)}
                                                            className="check_btn bg-green-500 text-white p-2 rounded-full hover:bg-green-700 transition duration-300"
                                                        >
                                                            <FaCheck />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDisableEdit()}
                                                            className="cross_btn bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition duration-300"
                                                        >
                                                            <RxCross2 />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => handleEnableEdit(element.id)}
                                                        className="edit_btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleDeleteJob(element.id)}
                                                className="delete_btn bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">You've not posted any job or maybe you deleted all of your jobs!</p>
                        )
                    )}
                    
                </div>
            </div>
            </section>
        </>
    );
}
