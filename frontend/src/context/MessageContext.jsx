import {createContext, useEffect, useState, useReducer} from "react";
import axios from "axios";
import { useAdminContext } from "../hooks/useAdminContext";
import { useNewMessageContext } from "../hooks/useNewMessageContext";
const PORT = import.meta.env.VITE_DOMAIN;
axios.defaults.withCredentials = true;
export const MessageContext= createContext();
export const MessageReducer= (state, action)=>{
    switch(action.type){
        case 'SET_MESSAGES':
            console.log("sign up admin context")
            return{
                messages: action.payload
            }
        case 'ADD_MESSAGE':
            console.log("this is in add_message:",state);
            let newMessages=[];
            if(state && state.messages){
                newMessages= [action.payload, ...state.messages]
            }else{
                newMessages= [action.payload];
            }
            return {
                messages:newMessages
            }
        default:
            return state;
    }
}



export const MessageContextProvider=  ({children})=>{
     const [state, dispatch]= useReducer(MessageReducer, {messages:null})
    //  dispatch({type: 'ADD_MESSAGE', })
    const {user}= useAdminContext();
     useEffect(()=>{
        console.log("inside message context");
        const getMessages= async()=>{
               try{
                const response= await axios.post(`${PORT}/api/anonymous/get_messages`, user);
                const messages= await response.data.messages;
                console.log("response from message context:", response.data.messages);
                dispatch({type:'SET_MESSAGES', payload: messages});
               }catch(error){
                console.log("getting error in message context");
               }
        }
        if(user && (user.userType == 'admin' || user.message != undefined)){
            getMessages();
        }
     },[user]);
     return (
        <MessageContext.Provider value= {{...state, dispatch}}>
         {children}
        </MessageContext.Provider>
     )
}