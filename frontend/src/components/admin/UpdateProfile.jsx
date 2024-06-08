import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
const PORT = import.meta.env.VITE_DOMAIN;
axios.defaults.withCredentials = true;
import { useAdminContext } from "../../hooks/useAdminContext";
import { useProfileContext } from "../../hooks/useProfileContext";

export default function UpdateProfile() {
    const {user, dispatch} = useAdminContext();
    const {profile : AdminProfile, dispatch : profileDispatch} = useProfileContext()
    const [profile, setProfile] = useState({
        userid : user.userid,
        first_name : '',
        last_name : '',
        designation : '',
        phone_number : '',
        linkedin : '',
        profile_picture_path : ''
    });

    const [docs, setDocs] = useState({
        profilePicture : '',
    });

    const [submitting, setSubmitting] = useState(false)

    const uploadPicture = async () => {
        try {
            setSubmitting(true)
            const formData = new FormData()

            formData.append('profilePicture', docs.profilePicture);
            const response = await axios.post(`${PORT}/api/student/uploadProfile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            const data = response.data
            console.log('Data containing files', data)
            setProfile({
                ...profile, profile_picture_path: data.profilePictureUrl,
            })
            toast.success("Profile Picture Uploaded, Update Profile now to reflect changes.")

        } catch (error) {
            toast.error("Error in uploading Profile Picture")
            console.log('Error in uploading files', error)
        } finally {
            setSubmitting(false)
        }
    }

    const onUpdate = async () => {
        try {
            setSubmitting(true)
            const response = await axios.put(`${PORT}/api/admin/updateProfile`, profile)
            console.log("Profile Updated", response)
            toast.success(response.data.message)

            profileDispatch({type : 'UPDATE', payload : response.data.info})
        } catch (error) {
            toast.error("Error in Updating Profile")
            console.log("error in updating profile", error)
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <>
            <div className="w-full  px-4 mt-6 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg bg-blueGray-100 border-0">
                    <p className='mb-5 lg:mb-0'><i>*Fill only those fields you want to update</i></p>
                    <div className="flex-auto px-4 lg:px-4 py-10 pt-0">
                        <div>
                            <h6 className="text-blueGray-400 text-sm mt-0 lg:mt-10 mb-6 font-bold uppercase">Admin Information</h6>
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
                                            value={profile.first_name}
                                            onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
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
                                            value={profile.last_name}
                                            onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-5">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="designation">
                                            Designation
                                        </label>
                                        <input
                                            type="text"
                                            id="designation"
                                            className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={profile.designation}
                                            onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-5">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="phoneNo">
                                            Phone Number
                                        </label>
                                        <input
                                            type="number"
                                            id="phoneNo"
                                            className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={profile.phone_number}
                                            onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="w-full  px-4">
                                    <div className="relative w-full mb-5">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="linkedIn">
                                            LinkedIn
                                        </label>
                                        <input
                                            type="text"
                                            id="linkedIn"
                                            className="text-black border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            value={profile.linkedin}
                                            onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-4">
                                    <div className="relative w-full mb-5">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="">
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
                            <h3 className="mb-2 text-gray-400">{submitting? <i>Processing...</i> : ""}</h3>
                            <button
                                className=" bg-yellow-500 text-zinc-900 font-semibold py-2 mt-2 ml-4 px-6 rounded-2xl hover:bg-yellow-600"
                                onClick={uploadPicture}
                                disabled = {submitting}>Upload</button>
                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h3 className="mb-2 text-gray-400">{submitting? <i>Processing...</i> : ""}</h3>
                            <button
                                className=" bg-yellow-500 text-zinc-900 font-semibold py-2 mt-10 px-6 rounded-2xl hover:bg-yellow-600"
                                onClick={onUpdate}
                                disabled = {submitting}>Update Profile</button>


                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}