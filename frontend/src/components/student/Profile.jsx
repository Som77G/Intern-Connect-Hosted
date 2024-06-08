import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import AsideBar from './AsideBar';
import { useAdminContext } from "../../hooks/useAdminContext";
import StudentHeader from './StudentHeader';
import { useProfileContext } from '../../hooks/useProfileContext';

const PORT = import.meta.env.VITE_DOMAIN;
axios.defaults.withCredentials = true;


export default function Profile() {
    const navigate = useNavigate();
    const { user: loginUser, dispatch } = useAdminContext();
    const {profile, dispatch: profileDispatch} = useProfileContext();
    

    const [docs, setDocs] = useState({
        profilePicture: null,
        resume: null
    })
    
    const [profileSubmitting, setProfileSubmitting] = useState(false)
    const [resumeSubmitting, setResumeSubmitting] = useState(false)
    const [formSubmitting, setFormSubmitting] = useState(false)
    const [studentProfile, setStudentProfile] = useState({
        profilecreated : loginUser.profileCreated,
        userid : loginUser.userid,
        firstName: '',
        lastName: '',
        college: '',
        course: '',
        branch: '',
        year: '',
        cpi: '',
        profilePicturePath: '',

        resumePath: '',
        project1: {
            githubLink: '',
            projectLink: '',
            demoLink: ''
        },
        project2: {
            githubLink: '',
            projectLink: '',
            demoLink: ''
        },
        gitHub: '',
        linkedIn: '',

        phoneNumber: '',
        address: '',
        city: '',
        country: '',
        postalCode: ''

    })

    const uploadPicture = async () => {
        try {
            setProfileSubmitting(true)
            const formData = new FormData()

            formData.append('profilePicture', docs.profilePicture);
            const response = await axios.post(`${PORT}/api/student/uploadProfile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            const data = response.data
            console.log('Data containing files', data)
            setStudentProfile({
                ...studentProfile, profilePicturePath: data.profilePictureUrl,
            })
            toast.success("Profile Picture Uploaded, Update Profile now to reflect changes.")

        } catch (error) {
            toast.error("Error in uploading Profile Picture")
            console.log('Error in uploading files', error)
        } finally {
            setProfileSubmitting(false)
        }
    }

    const uploadResume = async () => {
        try {
            setResumeSubmitting(true)
            console.log(docs.resume)
            const formData = new FormData()

            formData.append('resume', docs.resume);
            const response = await axios.post(`${PORT}/api/student/uploadResume`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            const data = response.data
            console.log('Data containing files', data)
            setStudentProfile({
                ...studentProfile, resumePath: data.resumeUrl,
            })
            toast.success("Resume Uploaded, Update Profile now to reflect changes.")
        } catch (error) {
            toast.error("Error in uploading Resume")
            console.log('Error in uploading files', error)
        } finally {
            setResumeSubmitting(false)
        }
    }
    const onUpdate = async () => {
        try {
            setFormSubmitting(true)
            const response = await axios.put(`${PORT}/api/student/updateProfile`, studentProfile)
            console.log("Profile Updated", response)
            toast.success(response.data.message)

            if (studentProfile.profilecreated == 0) {
                loginUser.profileCreated = 1;
                dispatch({type : 'LOGIN', payload : loginUser})
            }
            profileDispatch({type : 'UPDATE', payload : response.data.info})
        } catch (error) {
            toast.error("Error in Updating Profile")
            console.log("error in updating profile", error)
        } finally {
            setFormSubmitting(false)
        }
    }
    
    return (
        <>
            <StudentHeader/>
            <section className="flex flex-col lg:flex-row py-1 bg-blueGray-50">
                <AsideBar/>
                <div className="w-full lg:w-7/12 px-4 mt-6 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg bg-blueGray-100 border-0">
                        <p className='mb-5 lg:mb-0'><i>*Fill only those fields you want to update</i></p>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <div>
                                <h6 className="text-blueGray-400 text-sm mt-0 lg:mt-10 mb-6 font-bold uppercase">User Information</h6>
                                <div className="flex flex-wrap">

                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="first-name">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.firstName}
                                                onChange={(e) => setStudentProfile({ ...studentProfile, firstName: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="last-name">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.lastName}
                                                onChange={(e) => setStudentProfile({ ...studentProfile, lastName: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-8/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="last-name">
                                                College
                                            </label>
                                            <input
                                                type="text"
                                                id="college"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.college}
                                                onChange={(e) => setStudentProfile({ ...studentProfile, college: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="last-name">
                                                Course
                                            </label>
                                            <input
                                                type="text"
                                                id="course"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.course}
                                                onChange={(e) => setStudentProfile({ ...studentProfile, course: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="last-name">
                                                Branch
                                            </label>
                                            <input
                                                type="text"
                                                id="branch"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.branch}
                                                onChange={(e) => setStudentProfile({ ...studentProfile, branch: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="last-name">
                                                Year of Passout
                                            </label>
                                            <input
                                                type="number"
                                                id="year"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.year}
                                                onChange={(e) => setStudentProfile({ ...studentProfile, year: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="last-name">
                                                CPI (latest)
                                            </label>
                                            <input
                                                type="number"
                                                id="cpi"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.cpi}
                                                onChange={(e) => setStudentProfile({ ...studentProfile, cpi: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-8/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="last-name">
                                                Profile Picture
                                            </label>

                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                <div className="space-y-1 text-center">
                                                    <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <div className="flex text-sm text-gray-600">

                                                        <input
                                                            className=""
                                                            type="file"
                                                            name="file-upload"
                                                            id="file-upload"
                                                            accept="image/*"
                                                            onChange={(e) => setDocs({ ...docs, profilePicture: e.target.files[0] })}
                                                            required />
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    {/* button to upload file */}

                                </div>
                                <h3 className="mb-2 text-gray-400">{profileSubmitting? <i>Processing...</i> : ""}</h3>
                                <button
                                    className=" bg-yellow-500 text-zinc-900 font-semibold py-2 mt-2 ml-4 px-6 rounded-2xl hover:bg-yellow-600"
                                    onClick={uploadPicture}
                                    disabled={profileSubmitting}>Upload</button>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />

                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Academic Information</h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="address">
                                                Resume
                                            </label>
                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                <div className="space-y-1 text-center">
                                                    <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <div className="flex text-sm text-gray-600">

                                                        <input
                                                            className=""
                                                            type="file"
                                                            name="file-upload"
                                                            id="file-upload"
                                                            accept="application/pdf"
                                                            onChange={(e) => setDocs({ ...docs, resume: e.target.files[0] })}
                                                            required />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="mb-2 text-gray-400">{resumeSubmitting? <i>Processing...</i> : ""}</h3>
                                    <div className='w-full'>
                                        <button
                                            className=" bg-yellow-500 text-zinc-900 font-semibold py-2 mt-2 mb-10 ml-4 px-6 rounded-2xl hover:bg-yellow-600"
                                            onClick={uploadResume}
                                            disabled={resumeSubmitting}>Upload</button>
                                    </div>


                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="city">
                                                Project 1
                                            </label>
                                            <input
                                                type="text"
                                                id="githubLink"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.project1.githubLink}
                                                placeholder='GitHub Link'
                                                onChange={(e) => setStudentProfile({
                                                    ...studentProfile, project1: {
                                                        ...studentProfile.project1, githubLink: e.target.value
                                                    }
                                                })}
                                            />
                                        </div>

                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="city">
                                                Project 2
                                            </label>
                                            <input
                                                type="text"
                                                id="githubLink"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.project2.githubLink}
                                                placeholder='GitHub Link'
                                                onChange={(e) => setStudentProfile({
                                                    ...studentProfile, project2: {
                                                        ...studentProfile.project2, githubLink: e.target.value
                                                    }
                                                })}
                                            />
                                        </div>

                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-5">

                                            <input
                                                type="text"
                                                id="demoLink"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.project1.demoLink}
                                                placeholder='Demo Link'
                                                onChange={(e) => setStudentProfile({
                                                    ...studentProfile, project1: {
                                                        ...studentProfile.project1, demoLink: e.target.value
                                                    }
                                                })}
                                            />
                                        </div>

                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-5">

                                            <input
                                                type="text"
                                                id="demoLink"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.project2.demoLink}
                                                placeholder='Demo Link'
                                                onChange={(e) => setStudentProfile({
                                                    ...studentProfile, project2: {
                                                        ...studentProfile.project2, demoLink: e.target.value
                                                    }
                                                })}
                                            />
                                        </div>

                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-5">

                                            <input
                                                type="text"
                                                id="projectLink"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.project1.projectLink}
                                                placeholder='Project Link'
                                                onChange={(e) => setStudentProfile({
                                                    ...studentProfile, project1: {
                                                        ...studentProfile.project1, projectLink: e.target.value
                                                    }
                                                })}
                                            />
                                        </div>

                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-5">

                                            <input
                                                type="text"
                                                id="projectLink"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.project2.projectLink}
                                                placeholder='Project Link'
                                                onChange={(e) => setStudentProfile({
                                                    ...studentProfile, project2: {
                                                        ...studentProfile.project2, projectLink: e.target.value
                                                    }
                                                })}
                                            />
                                        </div>

                                    </div>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />

                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Social Platforms</h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-5/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="country">
                                                Github
                                            </label>
                                            <input
                                                type="text"
                                                id="gitHub"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.gitHub}
                                                onChange={(e) => setStudentProfile({ ...studentProfile, gitHub: e.target.value })}
                                            />
                                        </div>
                                    </div>




                                    <div className="w-full lg:w-7/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="postal-code">
                                                LinkedIn
                                            </label>
                                            <input
                                                type="text"
                                                id="linkedIn"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.linkedIn}
                                                onChange={(e) => setStudentProfile({ ...studentProfile, linkedIn: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>



                                <hr className="mt-6 border-b-1 border-blueGray-300" />

                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Contact Information</h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-7/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="address">
                                                Phone Number
                                            </label>
                                            <input
                                                type="number"
                                                id="phoneNumber"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.phoneNumber}
                                                onChange={(e) => setStudentProfile({ ...studentProfile, phoneNumber: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="address">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.address}
                                                onChange={(e) => setStudentProfile({ ...studentProfile, address: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="city">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                id="city"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.city}
                                                onChange={(e) => setStudentProfile({ ...studentProfile, city: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="country">
                                                Country
                                            </label>
                                            <input
                                                type="text"
                                                id="country"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.country}
                                                onChange={(e) => setStudentProfile({ ...studentProfile, country: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-5">
                                            <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="postal-code">
                                                Postal Code
                                            </label>
                                            <input
                                                type="text"
                                                id="postal-code"
                                                className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                value={studentProfile.postalCode}
                                                onChange={(e) => setStudentProfile({ ...studentProfile, postalCode: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                                <h3 className="mb-2 text-gray-400">{formSubmitting? <i>Processing...</i> : ""}</h3>
                                <button
                                    className=" bg-yellow-500 text-zinc-900 font-semibold py-2 mt-10 px-6 rounded-2xl hover:bg-yellow-600"
                                    onClick={onUpdate}
                                    disabled = {formSubmitting}>Update Profile</button>


                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}