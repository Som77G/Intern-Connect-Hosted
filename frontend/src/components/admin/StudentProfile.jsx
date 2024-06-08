import axios from "axios"
import { useState } from "react"
const PORT = import.meta.env.VITE_DOMAIN;
import { FaLinkedin } from "react-icons/fa";
import image from "../../assets/studentCover.jpeg";

axios.defaults.withCredentials = true
import { toast } from "react-toastify";

export default function StudentProfile({ profile }) {
    const [deduct, setDeduct] = useState(false)
    const [newCredits, setNewCredits] = useState('')
    const [message, setMessage] = useState('')
    const [verifying, setVerifying] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [block, setBlock] = useState(false)
    const onDeduct = async () => {
        try {
            setDisabled(true)
            setVerifying(true)
            console.log("New credits: ", newCredits)
            console.log("message: ", message)

            const data = {
                first_name: profile.first_name,
                last_name: profile.last_name,
                email: profile.email,
                userid: profile.userid,
                credit: newCredits,
                message: message
            }

            const response = await axios.put(`${PORT}/api/admin/deductcredit`, data)
            console.log("Credits updated successfully:", response.data.message)
            toast.success(response.data.message + ' ' + 'Mail has been sent to student')
        } catch (error) {
            console.log("Error in deducting credits: ", error)
            toast.error(error)
        } finally {
            setDisabled(false)
            setVerifying(false)
            setDeduct(false)
            setNewCredits('')
            setMessage('')
        }
    }
    const onBlock = async() => {
        try {
            setDisabled(true)
            setVerifying(true)

            const data = {
                first_name: profile.first_name,
                last_name: profile.last_name,
                email: profile.email,
                userid: profile.userid,
                message: message
            }

            const response = await axios.put(`${PORT}/api/admin/blockstudent`, data)
            console.log("Student Blocked successfully:", response.data.message)
            toast.success(response.data.message + ' ' + 'Mail has been sent to student')
        } catch (error) {
            console.log("Error in blocking student: ", error)
            toast.error(error)
        } finally {
            setDisabled(false)
            setVerifying(false)
            setBlock(false)
            setMessage('')
        }
    }
    return (
        <>
            {/* <div className="mt-5 bg-zinc-900 p-6 rounded">
                <h1>Name: </h1>
                <h3>{profile.first_name + " " + profile.last_name}</h3>
                <h1>Credits: </h1>
                <h3>{profile.credit}</h3>

                <button
                    className="bg-yellow-400 p-2 rounded mt-2"
                    onClick={(e) => setDeduct(true)}
                >Deduct credits</button>

                {deduct && (
                    <div className="flex flex-col">
                        <input
                            type = "number"
                            className="mt-4 pl-2 py-2 rounded text-black"
                            placeholder="New credits"
                            onChange = {(e) => setNewCredits(e.target.value)}
                        />
                        <textarea
                            className="mt-4 pl-2 py-2 rounded text-black"
                            placeholder="Reason To deduct credits (Will be mailed to student)"
                            onChange = {(e) => setMessage(e.target.value)}
                        />
                        <button
                        className="bg-yellow-400 p-2 rounded mt-2"
                        onClick={(e) => onDeduct()}
                        >Update</button>
                    </div>
                )}
            </div> */}


            <div
                className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-zinc-900 shadow-xl rounded-lg text-gray-900">
                <div className="rounded-t-lg h-32 overflow-hidden">
                    <img className=" bg-cover bg-center w-full " src={image} alt='FAANG' />
                </div>
                <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                    <img className="object-cover h-32 w-32" src={profile.profile_picture} alt='Student Profile' />
                </div>
                <div className="text-center mt-2">
                    <div className="flex flex-wrap justify-center ">
                        <div className="font-semibold text-gray-50 text-2xl">{profile.first_name + " " + profile.last_name}</div>
                        <div><a href={profile.linkedin} target="_blank"><FaLinkedin className="text-white text-2xl mt-1 mx-2" /></a></div>
                    </div>
                    <p className="text-gray-300 mt-3">{profile.course + " in " + profile.branch}</p>
                    <p className="text-gray-300">from</p>
                    <p className="text-gray-300">{profile.college}</p>
                </div>
                <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                    <li className="flex flex-col items-center justify-around">
                        <div className="text-gray-300">{profile.credit}</div>
                        <div className="text-gray-400 text-sm">SIP Credits</div>
                    </li>
                    <li className="flex flex-col items-center justify-around">
                        <div className="text-gray-300">{profile.cpi}</div>
                        <div className="text-gray-400 text-sm">Current CPI</div>
                    </li>
                    <li className="flex flex-col items-center justify-around">
                        <div className="text-gray-300">{profile.year}</div>
                        <div className="text-gray-400 text-sm">Batch</div>
                    </li>
                </ul>

                <hr className="mt-4"/>
                <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                    <li className="flex flex-col items-center justify-around">
                        <div className="text-gray-300">{profile.phoneNumber}</div>
                        <div className="text-gray-400 text-sm">Phone Number</div>
                    </li>
                    <li className="flex flex-col items-center justify-around">
                        <div className="text-gray-300">{profile.email}</div>
                        <div className="text-gray-400 text-sm">Email</div>
                    </li>
                    
                </ul>
                <div className="flex flex-wrap justify-center p-4 border-t mx-auto mt-2">
                    <button className=" block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
                        onClick={(e) => setDeduct(!deduct)}
                    >{deduct ? "Close" : "Deduct Credits"}</button>
                    <button className=" block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
                        onClick={(e) => setBlock(!block)}
                    >{block ? "Close" : "Block Student"}</button>
                </div>

                {deduct && (
                    <div className="flex flex-col w-4/5 mx-auto">
                        <input
                            type="number"
                            className="mt-4 pl-2 py-2 rounded text-black"
                            placeholder="New credits"
                            onChange={(e) => setNewCredits(e.target.value)}
                        />
                        <textarea
                            className="mt-4 pl-2 py-2 rounded text-black"
                            placeholder="Reason To deduct credits (Will be mailed to student)"
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <h1 className='text-center text-white mt-1'>{verifying ? "Processing..." : ""}</h1>
                        <div className="p-4 mx-auto my-2">
                            <button className=" block mx-auto rounded-lg bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
                                onClick={(e) => onDeduct()}
                                disabled={disabled}
                            >Update</button>
                        </div>
                    </div>
                )}
                {block && (
                    <div className="flex flex-col w-4/5 mx-auto">
                    <textarea
                        className="mt-4 pl-2 py-2 rounded text-black"
                        placeholder="Reason To Block Student on applying further jobs (Will be mailed to student)"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <h1 className='text-center text-white mt-1'>{verifying ? "Processing..." : ""}</h1>
                    <div className="p-4 mx-auto mt-2">
                        <button className=" block mx-auto rounded-lg bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
                            onClick={(e) => onBlock()}
                            disabled={disabled}
                        >Block</button>
                    </div>
                </div>
                )}
            </div>
        </>
    )
}