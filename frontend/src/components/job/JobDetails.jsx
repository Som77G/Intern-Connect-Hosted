import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAdminContext } from "../../hooks/useAdminContext";
import axios from "axios";
import AdminHeader from "../admin/AdminHeader";
import AdminNavbar from "../admin/AdminNavbar";
import StudentHeader from "../student/StudentHeader";
import AsideBar from "../student/AsideBar";
axios.defaults.withCredentials = true;
const PORT = import.meta.env.VITE_DOMAIN;

export default function JobDetails() {
    const { id } = useParams();
    const [job, setJob] = useState(null); // Initialize with null
    const [loading, setLoading] = useState(true); 
    const navigateTo = useNavigate();
    const { user } = useAdminContext();

    useEffect(() => {
        const getJob = async () => {
            try {
                console.log("Getting single Job");
                const response = await axios.get(`${PORT}/api/job/singleJob/${id}`, {
                    withCredentials: true
                });
                console.log("Received single job", response.data);
                setJob(response.data.job);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.log("Error at fetching single job", error);
                navigateTo("/notFound");
            }
        };

        if (user) {
            getJob();
        } else {
            setLoading(false); 
        }
    }, [user, id, navigateTo]);

    return (
        <>
        {/* <AdminHeader/> */}
        {user.userType == 'admin'? <AdminHeader/> : <StudentHeader/>}
        
        <section className="flex flex-col md:flex-row lg:flex-row py-1 bg-blueGray-50">
        {user.userType == 'admin' ? <AdminNavbar/> : <AsideBar/>}
        {user && job && (
              <section className="py-8  min-h-screen">
              <div className="container mx-auto px-8">
                  <h3 className="text-center text-3xl font-bold mb-6 text-white">Job Detail</h3>
                  <hr/>
                  <div className="p-6 bg-zinc-900 rounded-lg shadow-md">
                      <p className="mb-4 text-white">
                          <span className="font-semibold">Title:</span> <span>{job.title}</span>
                      </p>
                      <p className="mb-4 text-white">
                          <span className="font-semibold">Category:</span> <span>{job.category}</span>
                      </p>
                      <p className="mb-4 text-white">
                          <span className="font-semibold">Country:</span> <span>{job.country}</span>
                      </p>
                      <p className="mb-4 text-white">
                          <span className="font-semibold">City:</span> <span>{job.city}</span>
                      </p>
                      <p className="mb-4 text-white">
                          <span className="font-semibold">Location:</span> <span>{job.location}</span>
                      </p>
                      <p className="mb-4 text-white break-words">
                          <span className="font-semibold">Description:</span> <span>{job.description}</span>
                      </p>
                      <p className="mb-4 text-white">
                          <span className="font-semibold">Job Posted On:</span> <span>{job.jobPostedOn}</span>
                      </p>
                      <p className="mb-4 text-white">
                          <span className="font-semibold">Salary: </span>
                          {job.fixedSalary ? (
                              <span>${job.fixedSalary}</span>
                          ) : (
                              <span>
                                  ${job.salaryFrom} - ${job.salaryTo}
                              </span>
                          )}
                      </p>
                      {user && user.userType !== "admin" && user.profileBlocked !== 1 && (
                          <NavLink
                              to={`/user/application/${job.id}`} 
                              className="inline-block mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
                          >
                              Apply Now
                          </NavLink>
                      )}
                  </div>
              </div>
          </section>
        )}
        {(!user || !job) && <h3 className="mx-auto my-auto text-center text-3xl font-extrabold text-white">Fetching Detail...</h3>}
        </section>
        </>
    );
}
