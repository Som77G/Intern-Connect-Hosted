import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../hooks/useMessageContext";
import AdminNavbar from "./AdminNavbar";
import { useNewMessageContext } from "../../hooks/useNewMessageContext";
import { useAdminContext } from "../../hooks/useAdminContext";
import SearchStudent from "./SearchStudent";
import AdminHeader from "./AdminHeader";
import AddStudent from "./AddStudent";
// export const HasNewMessageContext= createContext();
export default function AdminHomePage() {
    return (
        <>
            {/* <HasNewMessageContext.Provider value= {{hasNewMessage, setHasNewMessage}}> */}
            <AdminHeader/>

            <section className=" flex flex-col md:flex-row lg:flex-row py-1 bg-blueGray-50">
                <AdminNavbar />

                <div className="mx-10 my-4 border rounded border-spacing-4 border-zinc-600 flex flex-col w-full lg:flex-row">
                <div className="w-3/5"><SearchStudent /></div>
                <div className="border-l my-4 border-stone-500"></div>
                <div className="w-2/5"><AddStudent/></div>
                
                </div>
                
            </section>

            {/* </HasNewMessageContext.Provider> */}
            
        </>
    )
}