// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAdminContext } from "../../hooks/useAdminContext";
// axios.defaults.withCredentials = true;
// const PORT = import.meta.env.VITE_DOMAIN;

// export default function Application() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [coverLetter, setCoverLetter] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [docs, setDocs] = useState({ resume: null });
//   const [resumePath, setResumePath] = useState('');
//   const { user } = useAdminContext();
//   const navigateTo = useNavigate();
//   const { id } = useParams();

//   const handleFileChange = (event) => {
//     const resume = event.target.files[0];
//     setDocs({ ...docs, resume });
//   };


//   const handleApplication = async (e) => {
//     e.preventDefault();

//     if (!docs.resume) {
//       toast.error("Resume file is required");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("resume", docs.resume);

//     try {
//       console.log("Resume is being uploaded");
//       const resumeResponse = await axios.post(`${PORT}/api/student/uploadResume`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       console.log("Resume uploaded successfully");
//       const resumeData = resumeResponse.data;

//       setResumePath(resumeData.resumeUrl);
//       console.log("Resume Path", resumeData);

//       const applicationData = new FormData();
//       applicationData.append("name", name);
//       applicationData.append("email", email);
//       applicationData.append("phone", phone);
//       applicationData.append("address", address);
//       applicationData.append("coverLetter", coverLetter);
//       applicationData.append("resume_public_id", resumeData.resumePublicId);
//       applicationData.append("resume_url", resumeData.resumeUrl);
//       applicationData.append("jobId", id);

//       console.log('application is being posted');
//       // Log each entry in FormData
//       for (let [key, value] of applicationData.entries()) {
//         console.log(`${key}: ${value}`);
//       }

//       const response = await axios.post(
//         `${PORT}/api/application/postApplication`,
//         applicationData,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       console.log("application posted successfully");

//       setName("");
//       setEmail("");
//       setCoverLetter("");
//       setPhone("");
//       setAddress("");
//       setDocs({ resume: null });
//       toast.success(response.data.message);
//       navigateTo("/user/job/getall");
//     } catch (error) {
//       toast.error(error.response.data.message || "Error in uploading files");
//     }
//   };

//   useEffect(()=>{
//     if (user && user.userType === 'admin') {
//       navigateTo("/");
//     }
//   }, [user])


//   return (
//     <section className="application bg-gray-900 min-h-screen flex items-center justify-center text-white">
//       <div className="container mx-auto p-6">
//         <h3 className="text-2xl font-bold mb-6 text-center">Application Form</h3>
//         <form onSubmit={handleApplication} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="email"
//             placeholder="Your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="number"
//             placeholder="Your Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             placeholder="Your Address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <textarea
//             placeholder="Cover Letter..."
//             value={coverLetter}
//             onChange={(e) => setCoverLetter(e.target.value)}
//             className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="4"
//           />
//           <div className="w-full px-4">
//             <div className="relative w-full mb-5">
//               <label className="block uppercase text-gray-400 text-xs font-bold mb-2" htmlFor="file-upload">
//                 Resume
//               </label>
//               <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                 <div className="space-y-1 text-center">
//                   <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
//                     <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                   <div className="flex text-sm text-gray-600">
//                     <input
//                       className="w-full text-center text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
//                       type="file"
//                       name="file-upload"
//                       id="file-upload"
//                       accept="application/pdf"
//                       onChange={handleFileChange}
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//               {resumePath && (
//                 <div className="mt-4 text-center">
//                   <a
//                     href={resumePath}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-400 hover:text-blue-600 underline"
//                   >
//                     View Uploaded Resume
//                   </a>
//                 </div>
//               )}
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
//           >
//             Send Application
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }




import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminContext } from "../../hooks/useAdminContext";
import { useMyApplicationsContext } from "../../hooks/useMyApplicationsContext";
import StudentHeader from "../student/StudentHeader";
import AsideBar from "../student/AsideBar";
axios.defaults.withCredentials = true;
const PORT = import.meta.env.VITE_DOMAIN;

export default function Application() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [docs, setDocs] = useState({ resume: null });
  const [resumePath, setResumePath] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAdminContext();
  const { myApplications, dispatch } = useMyApplicationsContext();
  const navigateTo = useNavigate();
  const { id } = useParams();

  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setDocs({ ...docs, resume });
  };

  const handleApplication = async (e) => {
    e.preventDefault();

    if (!docs.resume) {
      toast.error("Resume file is required");
      return;
    }

    const formData = new FormData();
    formData.append("resume", docs.resume);

    try {
      setIsUploading(true);
      console.log("Resume is being uploaded");
      const resumeResponse = await axios.post(`${PORT}/api/student/uploadResume`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setIsUploading(false);
      console.log("Resume uploaded successfully");
      const resumeData = resumeResponse.data;

      setResumePath(resumeData.resumeUrl);
      console.log("Resume Path", resumeData);

      const applicationData = new FormData();
      applicationData.append("name", name);
      applicationData.append("email", email);
      applicationData.append("phone", phone);
      applicationData.append("address", address);
      applicationData.append("coverLetter", coverLetter);
      applicationData.append("resume_public_id", resumeData.resumePublicId);
      applicationData.append("resume_url", resumeData.resumeUrl);
      applicationData.append("jobId", id);

      console.log('Application is being posted');
      // Log each entry in FormData
      for (let [key, value] of applicationData.entries()) {
        console.log(`${key}: ${value}`);
      }

      setIsSubmitting(true);
      const response = await axios.post(
        `${PORT}/api/application/postApplication`,
        applicationData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setIsSubmitting(false);
      console.log("Application posted successfully", response.data.application);
      await dispatch({ type: 'ADD_APPICATION', payload: response.data.application });
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setDocs({ resume: null });
      toast.success(response.data.message);
      navigateTo("/user/job/getall");
    } catch (error) {
      setIsUploading(false);
      setIsSubmitting(false);
      toast.error(error.response.data.message || "Error in uploading files");
    }
  };

  useEffect(() => {
    if (user && user.userType === 'admin') {
      navigateTo("/");
    }
  }, [user]);

  return (
    <>
      <StudentHeader />
      <section className="flex flex-col lg:flex-row py-1 bg-blueGray-50">
        <AsideBar />
        <section className="w-full px-10 application min-h-screen flex items-center justify-center text-white">
          <div className="w-2/3 container mx-auto p-6">
            <h3 className="text-3xl font-bold mb-6 text-center">Application Form</h3>
            <hr className="mb-8" />
            <form onSubmit={handleApplication} className="px-20 py-10 rounded-lg shadow-lg space-y-6 shadow-zinc-950">
              
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" w-2/5 p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ml-12 w-1/2  p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-3/5 p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-4/5 p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Cover Letter..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
              <div className="w-full px-4">
                <div className="relative w-full mb-5">
                  <label className="block uppercase text-gray-400 text-xs font-bold mb-2" htmlFor="file-upload">
                    Resume
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <input
                          className="w-full text-center text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                          type="file"
                          name="file-upload"
                          id="file-upload"
                          accept="application/pdf"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {isUploading && <p className="text-center text-blue-500">Uploading resume...</p>}
                  {resumePath && (
                    <div className="mt-4 text-center">
                      <a
                        href={resumePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 underline"
                      >
                        View Uploaded Resume
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex">
              <button
                type="submit"
                className="mx-auto p-0 w-2/5 bg-blue-600 text-black py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                disabled={isUploading || isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Send Application"}
              </button>
              </div>
            </form>
          </div>
        </section>
      </section>
    </>
  );
}

