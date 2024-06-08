// import axios from "axios"
// import { useState } from "react"
// import { toast } from "react-toastify";
// const PORT = import.meta.env.VITE_DOMAIN;

// export default function MessageBox({message, key}) {
//     const [submitting, setSubmitting] = useState(false)
//     const onSubmit = async() => {
//         try {
//             setSubmitting(true)
//             const username = message.from_username;
//             const res = await axios.put(`${PORT}/api/user/updatePassword`, {username})
//             console.log("Now student can reset password")
//             toast.success("Now student can reset password")
//             //here we can write logic to notify student about it by sending him mail or something
//         } catch (error) {
//             toast.error("Internal Server Error")
//             console.log(error)
//         } finally {
//             setSubmitting(false)
//         }
//     }
//     return (
//         <>
//             <div
//                 className="lg:w-5/12 mb-10 rounded-lg bg-zinc-900 p-6 text-white border border-gray-600">
//                 <h5 className="mb-2 text-xl font-medium leading-relaxed"><i>From</i> : {message.from_username}</h5>
//                 <h5 className="mb-2 text-xl font-medium leading-relaxed"><i>To</i> : {message.to_username}</h5>
//                 <hr/>
//                 <p className="my-4 text-base">
//                     {message.message}
//                 </p>
//                 <p className="my-4 font-extralight text-gray-400"><i>*Click below to allow student to reset their password</i></p>
//                 <h3 className="mb-2 text-gray-400">{submitting? <i>Processing...</i> : ""}</h3>
//                 <button
//                     type="button"
//                     className="rounded bg-yellow-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black"
//                     onClick={(e) => onSubmit()}
//                     disabled = {submitting}
//                     >
//                     Update Password
//                 </button>
//             </div>
//         </>
//     )
// }


import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const PORT = import.meta.env.VITE_DOMAIN;

export default function MessageBox({message}) {
    const [submitting, setSubmitting] = useState(false)
    const onSubmit = async() => {
        try {
            setSubmitting(true);
            const username = message.from_username;
            const res = await axios.put(`${PORT}/api/user/updatePassword`, { username });
            console.log("Now student can reset password");
            toast.success("Now student can reset password");
            // Logic to notify student about it by sending an email or something
        } catch (error) {
            toast.error("Internal Server Error");
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <div
                
                className="lg:w-5/12 mb-10 rounded-lg bg-zinc-900 p-6 text-white border border-gray-600">
                <h5 className="mb-2 text-xl font-medium leading-relaxed"><i>From</i> : {message.from_username}</h5>
                <h5 className="mb-2 text-xl font-medium leading-relaxed"><i>To</i> : {message.to_username}</h5>
                <hr/>
                <p className="my-4 text-base">
                    {message.message}
                </p>
                <p className="my-4 font-extralight text-gray-400"><i>*Click below to allow student to reset their password</i></p>
                <h3 className="mb-2 text-gray-400">{submitting? <i>Processing...</i> : ""}</h3>
                <button
                    type="button"
                    className="rounded bg-yellow-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black"
                    onClick={(e) => onSubmit()}
                    disabled = {submitting}
                    >
                    Update Password
                </button>
            </div>
        </>
    )
}
