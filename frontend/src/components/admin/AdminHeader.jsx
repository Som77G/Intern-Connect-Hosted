import { useLogout } from "../../hooks/useLogout";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../hooks/useMessageContext";
import { useNewMessageContext } from "../../hooks/useNewMessageContext";
import { useAdminContext } from "../../hooks/useAdminContext";
import UseSocketSetup from "../../hooks/UseSocketSetup";
export default function AdminHeader() {
    const {logout} = useLogout()

    const navigate = useNavigate()
    const { messages } = useMessageContext();
    const { hasNewMessage, dispatch } = useNewMessageContext();
    const { user } = useAdminContext();
    const [last, setLast] = useState(false);
    // const [hasNewMessage, setHasNewMessage]= useState(false);
    // useEffect(() => {
    //     navigate('/admin-dashboard')
    // }, [])
    console.log("first time: ", hasNewMessage);
    useEffect(() => {
        console.log("hello buddy message");
        if (messages && messages.length > 0 && hasNewMessage == "default") {
            console.log("Hello inside messages default")
            dispatch({ type: "GOT_MESSAGE" });
        }


        console.log("inside the main context");
        //  if(messages && messages.length > 0 && hasNewMessage=='none'){
        //     console.log("hello messages inside last useEffect");
        //     dispatch({type: 'RESET'});

        // }
        console.log("hasNewMessages", hasNewMessage);
    }, [messages])

    useEffect(() => {
        console.log("admin page render again");
        console.log("hasNewMessage: ", hasNewMessage);
        if ((hasNewMessage == "seen_message")) {
            dispatch({ type: "NONE" });
        }
    }, [hasNewMessage])
   
    
    const onLogout = async() => {
        logout();
    }
    UseSocketSetup();
    return (
        <>
           
            <nav className="flex justify-between py-4 px-10 lg:px-16 shadow-2xl rounded" >
                <div className="text-3xl font-bold text-purple-600">SIP Portal</div>
                <button
                    className="bg-yellow-500 text-black py-2 px-6 rounded-2xl hover:bg-yellow-600"
                    onClick={(e) => onLogout()}>Log Out</button>

                {hasNewMessage == "new_message" && (
                    <div className="fixed top-0 right-0 m-4 bg-yellow-500 text-white px-4 py-2 rounded">
                        New Message!
                    </div>
                )}
            </nav>
        </>
    )
}