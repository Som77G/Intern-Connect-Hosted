import { IoHomeSharp, IoTabletPortraitSharp, IoClose  } from "react-icons/io5";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { useState } from "react";
import { BiSolidLogInCircle, BiMenu } from 'react-icons/bi';
import { NavLink } from "react-router-dom";
import image from "../assets/home.svg";



export default function Home() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div className="bg-zinc-900">
                {/* Navbar */}

                <nav className="flex flex-wrap flex-col md:flex-row justify-between items-center py-4 px-5 md:px-10 shadow-2xl">
                    <div className="flex justify-between items-center w-full md:w-auto">
                        <div className="py-2 md:py-0 text-2xl md:text-3xl font-bold text-purple-600">SIP Portal</div>
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="text-3xl focus:outline-none">
                                {!isOpen && <BiMenu />} 
                                {isOpen && <IoClose  />}
                            </button>
                        </div>
                    </div>
                    <div className={`flex-grow flex-col md:flex-row md:flex ${isOpen ? 'flex' : 'hidden'} md:space-x-8 lg:space-x-10 xl:space-x-12 justify-center`}>
                        <div className="flex items-center py-1 md:py-0 text-lg cursor-pointer  hover:text-yellow-500 mx-2 md:mx-4">
                            <IoHomeSharp size={20}/>
                            <NavLink className="ml-1 lg:mx-3" to="/">Home</NavLink>
                        </div>
                        {isOpen && (
                            <hr className="my-1"></hr>
                        )}
                        <div className="flex items-center py-1 md:py-0 text-lg cursor-pointe hover:text-yellow-500 mx-2 md:mx-4">
                            <IoTabletPortraitSharp size={20} />
                            <NavLink className="ml-1 lg:mx-3" to="/about">About Portal</NavLink>
                        </div>
                        {isOpen && (
                            <hr className="my-1"></hr>
                        )}
                        <div className="flex items-center py-1 md:py-0 text-lg cursor-pointer hover:text-yellow-500 mx-2 md:mx-4">
                            <BsFillInfoCircleFill size={20} />
                            <NavLink className="ml-1 lg:mx-3" to="/info">Info</NavLink>
                        </div>
                        {isOpen && (
                            <hr className="my-1"></hr>
                        )}
                        <div className="flex items-center py-1 md:py-0 text-lg cursor-pointer hover:text-yellow-500 mx-2 md:mx-4">
                            
                            <BiSolidLogInCircle size={25} />
                            
                            <NavLink className="ml-1 lg:mx-3" to="/login">Login</NavLink>
                        </div>
                    </div>

                </nav>

                {/* Main Content */}
                <div className="flex flex-col md:flex-row items-center justify-between mx-auto max-w-7xl px-6 py-12 my-20">
                    {/* Text Section */}
                    <div className="md:w-1/2">
                        <h1 className="text-5xl font-bold text-purple-700">Intern - Connect</h1>
                        <p className="mt-4 px-2 text-gray-500">
                            Welcome to our Student Internship Portal, where opportunities await to transform your academic knowledge
                            into practical skills. We are committed to bridging the gap between education and employment, offering
                            students a platform to gain valuable experience, and prepare for a successful career.
                        </p>

                    </div>

                    {/* Image Section */}
                    <div className="md:w-1/2 mt-10 md:mt-0">
                        <img src={image} alt="Internship" className="w-full h-auto" />
                    </div>
                </div>
            </div>
        </>
    )
}