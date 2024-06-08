import { NavLink, useNavigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { BiSolidNotification } from "react-icons/bi";

export default function AsideBar() {
    const navigate = useNavigate()
    return (
        <div className='shadow-lg shadow-zinc-950'>
          <aside className="w-20 md:w-60 text-white p-6 flex flex-col lg:h-screen">
            <nav className="flex flex-row justify-between md:flex-col">
              <div className="flex items-center my-4 ml-5 lg:ml-10 cursor-pointer hover:text-blue-400">
                <MdDashboard size={20} />
                <NavLink className="mr-4 ml-1 lg:mx-3"
                  to = '/student-dashboard'
                >Dashboard</NavLink>
              </div>
              <hr/>
              <div className="flex items-center my-4 ml-5 lg:ml-10 cursor-pointer hover:text-blue-400">
                <GrUpdate size={20} />
                <NavLink className="mr-4 ml-1 lg:mx-3"
                  to = '/student-dashboard/profile'
                >Profile</NavLink>
              </div>
              <hr/>

              <div className="flex items-center my-4 ml-5 lg:ml-10 cursor-pointer hover:text-blue-400">
                <GrUpdate size={20} />
                <NavLink className="mr-4 ml-1 lg:mx-3"
                 to = '/user/job/getAll'
                >All Jobs</NavLink>
              </div>
              <hr/>
              <div className="flex items-center my-4 ml-5 lg:ml-10 cursor-pointer hover:text-blue-400">
                <GrUpdate size={20} />
                <NavLink className="mr-4 ml-1 lg:mx-3"
                  to = '/user/application/me'
                >Applications</NavLink>
              </div>

            </nav>
          </aside>
        </div>
    )
}