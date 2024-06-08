import { createContext, useEffect, useReducer } from "react";
import { useAdminContext } from "../hooks/useAdminContext";
import axios from "axios";
const PORT = import.meta.env.VITE_DOMAIN;

export const ProfileContext = createContext();

export const ProfileReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE' : 
        console.log("PRofile Context: ", action.payload)
        return {profile : action.payload}
        default :
            return state
    }
}

//Provider
export const ProfileContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(ProfileReducer, {profile : null});
    const {user} = useAdminContext();

    console.log("Inside Profile Context")
    useEffect(() => {
        const fetchProfile = async() => {
            try {
                const response = await axios.get(`${PORT}/api/${user.userType}/dashboard?userid=${encodeURIComponent(user.userid)}`);
                const userInfo = response.data.message;

                dispatch({type : 'UPDATE', payload : userInfo})
            } catch (error) {
                console.log("getting error in profile context: ", error);
            }
        }
        if (user)
            fetchProfile();
    }, [user])

    return (
        <ProfileContext.Provider value = {{...state, dispatch}}>
            {children}
        </ProfileContext.Provider>
    )
}