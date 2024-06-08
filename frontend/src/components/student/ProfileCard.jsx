import { useState } from "react"
import { FaLinkedin, FaGithub } from "react-icons/fa";
import image from "../../assets/studentCover.jpeg";


export default function ProfileCard({ profile }) {
    const [loadMore, setLoadMore] = useState(false)

    return (
        <>
            <div
                className="mb-10 w-3/5 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-zinc-900 shadow-xl rounded-lg text-gray-900">
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
                        <div><a href={profile.github} target="_blank"><FaGithub className="text-white text-2xl mt-1 mx-2" /></a></div>
                    </div>
                    <p className="text-gray-400 mt-2">Student ID: {profile.username}</p>
                    <p className="text-gray-300 mt-8">{profile.course + " in " + profile.branch}</p>
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

                <hr className="mt-4" />
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
                {loadMore && (
                    <>
                        <hr/>
                        <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                            <li className="flex flex-col items-center justify-around">
                                <div className="text-gray-300">{profile.address}</div>
                                <div className="text-gray-400 text-sm">Address</div>
                            </li>

                        </ul>
                        <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                            <li className="flex flex-col items-center justify-around">
                                <div className="text-gray-300">{profile.city}</div>
                                <div className="text-gray-400 text-sm">City</div>
                            </li>
                            <li className="flex flex-col items-center justify-around">
                                <div className="text-gray-300">{profile.country}</div>
                                <div className="text-gray-400 text-sm">Country</div>
                            </li>
                            <li className="flex flex-col items-center justify-around">
                                <div className="text-gray-300">{profile.postal_code}</div>
                                <div className="text-gray-400 text-sm">Postal Code</div>
                            </li>
                        </ul>
                    </>
                )}
                <div className="p-4 mx-auto mt-2">
                    <button className=" block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-8 py-2"
                        onClick={(e) => setLoadMore(!loadMore)}
                    >{!loadMore? "Load More.." : "Hide"}</button>
                </div>

                
            </div>
        </>
    )
}