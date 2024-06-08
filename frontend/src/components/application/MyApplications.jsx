import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../hooks/useAdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import ResumeModal from "./ResumeModal";
import { useMyApplicationsContext } from "../../hooks/useMyApplicationsContext";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../admin/AdminHeader";
import StudentHeader from "../student/StudentHeader";
import AdminNavbar from "../admin/AdminNavbar";
import AsideBar from "../student/AsideBar";
import image from "../../assets/home.svg";

axios.defaults.withCredentials = true;
const PORT = import.meta.env.VITE_DOMAIN;

export default function MyApplications() {
    const { user } = useAdminContext();
    // const [applications, setApplications] = useState([]);
    const { myApplications: applications, dispatch } = useMyApplicationsContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [resumePdfUrl, setResumePdfUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const navigateTo = useNavigate();
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                if (user && user.userType === 'student') {
                    console.log("fetching student applications");
                    const response = await axios.get(`${PORT}/api/application/student/applications`, {
                        withCredentials: true
                    });
                    console.log("student applications received");
                    // setApplications(response.data.applications);
                    await dispatch({ type: 'SET_APPLICATIONS', payload: response.data.applications });
                    setLoading(false)
                } else if (user && user.userType === 'admin') {
                    console.log("fetching admin applications");
                    const response = await axios.get(`${PORT}/api/application/admin/applications`, {
                        withCredentials: true
                    });
                    console.log("Received admin applications");
                    // setApplications(response.data.applications);
                    await dispatch({ type: 'SET_APPLICATIONS', payload: response.data.applications });
                    setLoading(false)
                }
            } catch (error) {
                console.log("Error at fetching applications", error);
                toast.error(error.response.data.message);
            }
        };

        fetchApplications();
    }, [user]);

    const deleteApplication = async (id) => {
        try {
            console.log('deleting application');
            const response = await axios.delete(`${PORT}/api/application/student/delete/${id}`, {
                withCredentials: true
            });
            console.log("application deleted successfully");
            toast.success(response.data.message);
            // setApplications((prevApplications) =>
            //     prevApplications.filter((application) => application.id !== id)
            // );
            await dispatch({ type: 'DELETE_APPLICATION', payload: id });
        } catch (error) {
            console.log("Error at deleting student application");
            toast.error(error.response.data.message);
        }
    };

    const openModal = (pdfUrl) => {
        setResumePdfUrl(pdfUrl);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    return (
        <>
            {user.userType == 'admin' ? <AdminHeader /> : <StudentHeader />}
            <section className="flex flex-col md:flex-row lg:flex-row py-1 bg-blueGray-50">
                {user.userType == 'admin' ? <AdminNavbar /> : <AsideBar />}
                <section className="my_applications page py-8 px-20 text-white w-full">
                    {user && user.userType === "student" ? (
                        <div className=" container mx-auto">
                            <h1 className="text-center text-3xl font-bold mb-4 ">My Applications</h1>
                            <hr className="mb-8" />
                            {loading? (
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
                                        <div className='text-xl font-mono font-semibold text-gray-200'>Loading Applications ...</div>
                                    </div>
                                </>
                            ) : (
                                !applications || applications.length <= 0 ? (
                                    <div className="flex flex-wrap justify-center mx-4">
                                        <div className="md:w-1/3 mt-20 ">
                                            <img src={image} alt="Internship" className="w-full h-auto" />
                                            <div className="flex flex-wrap justify-center mt-10 text-xl font-extrabold">NO Applications Found</div>
                                        </div>
                                    </div>
                                ) : (
                                    applications.map((element) => (
                                        <JobSeekerCard
                                            element={element}
                                            key={element.id}
                                            deleteApplication={deleteApplication}
                                            openModal={openModal}
                                            navigateTo={navigateTo}
                                        />
                                    ))
                                )
                            )}
                            
                        </div>
                    ) : (
                        <div className="container mx-auto">
                            <h1 className="text-center text-3xl font-bold mb-4 uppercase">Applications from job seekers</h1>
                            <hr className="mb-8" />
                            {loading? (
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
                                        <div className='text-xl font-mono font-semibold text-gray-200'>Loading Applications ...</div>
                                    </div>
                                </>
                            ) : (
                                !applications || applications.length <= 0 ? (
                                    <div className="flex flex-wrap justify-center mx-4">
                                        <div className="md:w-1/3 mt-20 ">
                                            <img src={image} alt="Internship" className="w-full h-auto" />
                                            <div className="flex flex-wrap justify-center mt-10 text-xl font-extrabold">NO Applications Found</div>
                                        </div>
                                    </div>
                                ) : (
                                    applications.map((element) => (
                                        <EmployerCard
                                            element={element}
                                            key={element.id}
                                            openModal={openModal}
                                            navigateTo={navigateTo}
                                        />
                                    ))
                                )
                            )}
                            
                        </div>
                    )}
                    {modalOpen && (
                        <ResumeModal pdfUrl={resumePdfUrl} onClose={closeModal} />
                    )}
                </section>
            </section>
        </>
    );
}

const JobSeekerCard = ({ element, deleteApplication, openModal, navigateTo }) => {
    return (
        <div className="bg-zinc-900 border border-zinc-600 rounded-lg p-6 mb-4 text-white w-1/2">
            <div className="detail mb-6">
                <p><span className="font-bold">Name:</span> {element.name}</p>
                <p><span className="font-bold">Email:</span> {element.email}</p>
                <p><span className="font-bold">Phone:</span> {element.phone}</p>
                <p><span className="font-bold">Address:</span> {element.address}</p>
                <p><span className="font-bold">Cover Letter:</span> {element.coverLetter}</p>
            </div>
            <div className="flex flex-wrap justify-center space-x-4">
                <div className="mb-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => openModal(element.resume_url)}
                    >
                        View Resume
                    </button>
                </div>
                <div className="mb-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => navigateTo(`/user/job/${element.jobID}`)}
                    >
                        View Job
                    </button>
                </div>
                <div className="">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => deleteApplication(element.id)}
                    >
                        Delete Application
                    </button>
                </div>
            </div>
        </div>
    );
};

const EmployerCard = ({ element, openModal, navigateTo }) => {
    return (
        <div className="border border-zinc-600 w-1/2  rounded-lg p-6 mb-4 text-white">
            <div className="detail mb-6">
                <p><span className="font-bold">Name:</span> {element.name}</p>
                <p><span className="font-bold">Email:</span> {element.email}</p>
                <p><span className="font-bold">Phone:</span> {element.phone}</p>
                <p><span className="font-bold">Address:</span> {element.address}</p>
                <p><span className="font-bold">Cover Letter:</span> {element.coverLetter}</p>
            </div>
            <div className="flex flex-wrap justify-center space-x-4">
                <div className="mb-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => openModal(element.resume_url)}
                    >
                        View Resume
                    </button>
                </div>
                <div className="">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => navigateTo(`/user/job/${element.jobID}`)}
                    >
                        View Job
                    </button>
                </div>
            </div>
        </div>
    );

};
