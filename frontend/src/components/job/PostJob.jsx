import React, { useEffect, useState } from "react";
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
import axios from "axios";
import { toast } from "react-toastify";
import { useAdminContext } from "../../hooks/useAdminContext";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../admin/AdminHeader";
import AdminNavbar from "../admin/AdminNavbar";
import { useJobsContext } from "../../hooks/useJobsContext";
import { useMyJobsContext } from "../../hooks/useMyJobsContext";
axios.defaults.withCredentials = true;
const PORT = import.meta.env.VITE_DOMAIN;
// const PORT= import.meta.env.VITE_DOMAIN;
export default function PostJob() {
    const { user } = useAdminContext();
    const {jobs, dispatch}= useJobsContext();
    const {dispatch: distpatchMyJobs}= useMyJobsContext();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [salaryFrom, setSalaryFrom] = useState("");
    const [salaryTo, setSalaryTo] = useState("");
    const [fixedSalary, setFixedSalary] = useState("");
    const [salaryType, setSalaryType] = useState("default");
    const [companyName, setCompanyName] = useState("");
    const [postedBy, setPostedBy] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleCountryChange = (selectedOption) => {
        setCountry(selectedOption);
        setState(null);
        setCity(null);
    };

    const handleStateChange = (selectedOption) => {
        setState(selectedOption);
        setCity(null);
    };

    const handleCityChange = (selectedOption) => {
        setCity(selectedOption);
    };

    const countries = Country.getAllCountries().map(country => (
        {
            value: country.isoCode,
            label: country.name
        }
    ));

    const states = country
        ? State.getStatesOfCountry(country.value).map(state => (
            {
                value: state.isoCode,
                label: state.name
            }
        ))
        : [];

    const cities = state
        ? City.getCitiesOfState(country.value, state.value).map(city => (
            {
                value: city.name,
                label: city.name
            }
        ))
        : [];
    useEffect(() => {
        if (user) {
            setPostedBy(user.userid);
        }
    }, [user])
    const handleJobPost = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setButtonDisabled(true);
            //sending request to save the job 
            console.log("Request sent to save the job");
            const response = await axios.post(`${PORT}/api/job/postJob`,
                {
                    title,
                    description,
                    category,
                    country,
                    state,
                    city,
                    location,
                    salaryFrom,
                    salaryTo,
                    fixedSalary,
                    companyName,
                    postedBy
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Job Posted Successfully", response.data.job);
            console.log("Jobs: ", jobs);
            await dispatch({type:'ADD_JOB', payload:response.data.job});
            await dispatch({type:'ADD_MYJOB', payload:response.data.job});
            toast.success(response.data.message);
            setSalaryFrom("");
            setSalaryTo("");
            setFixedSalary("");
        } catch (error) {
            console.error("Error at posting job", error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
            setButtonDisabled(false);
        }
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: '1px solid #d1d5db',
            padding: '0.5rem',
            boxShadow: 'none',
            '&:hover': {
                border: '1px solid #6b7280'
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#6366f1' : state.isSelected ? '#4f46e5' : null,
            color: state.isFocused ? 'white' : 'black',
            '&:hover': {
                backgroundColor: '#6366f1',
                color: 'white'
            }
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 20,
        }),
    };
    const navigateTo = useNavigate();
    useEffect(() => {
        if (user && user.userType !== 'admin') {
            navigateTo("/");
        }
    }, [user])
    return (
        <>
        
        <AdminHeader/>
        <section className="flex flex-col md:flex-row lg:flex-row py-1 bg-blueGray-50">
        <AdminNavbar/>
        <div className=" min-h-screen flex items-center flex-wrap w-full justify-center bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className=" shadow-xl shadow-zinc-950 px-20 pb-10 w-2/3 space-y-8">
                <h3 className="text-center text-3xl font-extrabold text-white">
                    POST NEW JOB
                </h3>
                <hr/>
                <form onSubmit={handleJobPost} className="mt-8 space-y-8">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="flex flex-wrap w-full">
                        <div className="w-1/2 mr-6">
                            <label htmlFor="title" className="sr-only">Job Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Job Title"
                                className="appearance-none rounded-none w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                        <div className=" w-2/5">
                            <label htmlFor="category" className="sr-only">Category</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="appearance-none rounded-md w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            >
                                <option value="">Select Category</option>
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
                        </div>
                        </div>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <div className="w-1/2">
                            <Select
                                placeholder="Select Country"
                                value={country}
                                onChange={handleCountryChange}
                                options={countries}
                                styles={customStyles}
                            />
                        </div>
                        <div className="w-1/2">
                            <Select
                                placeholder="Select State"
                                value={state}
                                onChange={handleStateChange}
                                options={states}
                                isDisabled={!country}
                                styles={customStyles}
                            />
                        </div>
                        <div className="w-1/2">
                            <Select
                                placeholder="Select City"
                                value={city}
                                onChange={handleCityChange}
                                options={cities}
                                isDisabled={!state}
                                styles={customStyles}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap w-full">
                    <div className=" w-1/2 mr-6">
                        <label htmlFor="companyName" className="sr-only">Company Name</label>
                        <input
                            type="text"
                            id="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Company Name"
                            className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                    <div className=" w-2/5">
                        <label htmlFor="location" className="sr-only">Location</label>
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Location"
                            className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                    </div>
                    <div className="mb-4 w-4/5">
                        <label htmlFor="salaryType" className="sr-only">Salary Type</label>
                        <select
                            id="salaryType"
                            value={salaryType}
                            onChange={(e) => setSalaryType(e.target.value)}
                            className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        >
                            <option value="default">Select Salary Type</option>
                            <option value="Fixed Salary">Fixed Salary</option>
                            <option value="Ranged Salary">Ranged Salary</option>
                        </select>
                    </div>
                    {salaryType === "Fixed Salary" && (
                        <div className="mb-4">
                            <label htmlFor="fixedSalary" className="sr-only">Fixed Salary</label>
                            <input
                                type="number"
                                id="fixedSalary"
                                placeholder="Enter Fixed Salary"
                                value={fixedSalary}
                                onChange={(e) => setFixedSalary(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </div>
                    )}
                    {salaryType === "Ranged Salary" && (
                        <div className="flex space-x-4 mb-4">
                            <div className="w-1/2">
                                <label htmlFor="salaryFrom" className="sr-only">Salary From</label>
                                <input
                                    type="number"
                                    id="salaryFrom"
                                    placeholder="Salary From"
                                    value={salaryFrom}
                                    onChange={(e) => setSalaryFrom(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="salaryTo" className="sr-only">Salary To</label>
                                <input
                                    type="number"
                                    id="salaryTo"
                                    placeholder="Salary To"
                                    value={salaryTo}
                                    onChange={(e) => setSalaryTo(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                        </div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="description" className="sr-only">Job Description</label>
                        <textarea
                            id="description"
                            rows="10"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Job Description"
                            className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                    </div>
                    <div>
                        <h3 className="text-center font-extrabold text-white mb-2">
                            {loading ? "Processing..." : ""}
                        </h3>
                        <button
                            type="submit"
                            className="mx-auto group relative flex flex-wrap justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={buttonDisabled}
                        >
                            Create Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </section>
        </>
    );
}
