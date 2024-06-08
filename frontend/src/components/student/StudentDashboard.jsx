import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../../hooks/useAdminContext";
import {useProfileContext} from "../../hooks/useProfileContext"
import AsideBar from "./AsideBar";
import image from "../../assets/home.svg";


const PORT = import.meta.env.VITE_DOMAIN;

import React from 'react';
import { MdDashboard } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { BiSolidNotification } from "react-icons/bi";
import ProfileCard from "./ProfileCard";
import ShowProjects from "./ShowProjects";
import StudentHeader from "./StudentHeader";

export default function StudentDashboard() {
  const { user: loginUser, dispatch } = useAdminContext();
  const { profile } = useProfileContext()
  let project1 = {}, project2 = {};
  if (profile) {
    project1 = {
      githubLink: profile.project1_github_link,
      projectLink: profile.project1_project_link,
      demoLink: profile.project1_demo_link
    }
    project2 = {
      githubLink: profile.project2_github_link,
      projectLink: profile.project2_project_link,
      demoLink: profile.project2_demo_link
    }
  }
  
  
  return (
    <>
      <StudentHeader/>
      <section className="flex flex-col lg:flex-row py-1 ">
        <AsideBar/>
        
        {(loginUser.profileCreated == 0)? 
            (<>
                <div className="flex flex-wrap justify-center m-4 w-full h-screen">
                <div className="md:w-1/3 mt-36 ">
                        <img src={image} alt="Internship" className="w-full h-auto" />
                        <div className="flex flex-wrap justify-center mt-10 text-xl font-extrabold">Complete your profile Now...</div> 
                </div>
                </div>
            </>) :
            (!profile? (<div className='w-full flex flex-col justify-center items-center h-screen'>
            <div className='flex flex-row space-x-2'>
                <span className='sr-only'>Loading...</span>
                <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
                <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
                <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
            </div>
            <br />
            <div className='text-xl font-mono font-semibold text-gray-200'>Loading Profile ...</div>
        </div>) :
        (<div className="mx-10 my-4 border rounded border-spacing-4 border-zinc-600 flex flex-col w-full lg:flex-row">
          <div className="w-3/5"><ProfileCard profile={profile} /></div>
          <div className="border-l my-4 border-stone-500"></div>
          <div className="w-2/5 mt-8 ">
            
            <div className="w-full"><ShowProjects project={project1} number = {1} /></div>
            <div className="w-full"><ShowProjects project={project2} number = {2} /></div>
            <div className="mx-4 mt-8 flex justify-center items-center h-96">
              <iframe className="w-full h-full border-none" src={profile.resume}></iframe>
            </div>
          </div>

        </div>))}
      </section>
    </>
  );
};

