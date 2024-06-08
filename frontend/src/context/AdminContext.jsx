import {createContext, useEffect, useState, useReducer} from "react";
import Cookies from "js-cookie";
import axios from "axios";

const PORT = import.meta.env.VITE_DOMAIN;
axios.defaults.withCredentials = true;
export const AdminContext= createContext();
export const AdminReducer= (state, action)=>{
    switch(action.type){
        case 'LOGIN':
            console.log("sign up admin context")
            const newUser= action.payload;
            return {user: newUser};
        case 'LOGOUT':
            return {user: null};
        
        default:
            return state;
    }
}



export const AdminContextProvider=  ({children})=>{
     const [state, dispatch]= useReducer(AdminReducer, {user:null})
     const [cookieValue, setCookieValue] = useState(null);
     useEffect(()=>{
         console.log("inside admin context");
         
        // const token = Cookies.get('token')
         
         const getAdmin= async()=>{
            try{
                const response = await axios.get(`${PORT}/api/user/getAdmin`);
                const user= await response.data.user;
                console.log("User: ", user)
                dispatch({type: "LOGIN", payload: user});
    
            }catch(error){
                console.log("Getting error at conxtext")
                console.log("error at fetching admin", error.response.data.error);
                
            }
        }
         
            getAdmin();
         
     }, [])
     console.log("Authentication state:", state);
     return (
        <AdminContext.Provider value= {{...state, dispatch}}>
         {children}
        </AdminContext.Provider>
     )
}