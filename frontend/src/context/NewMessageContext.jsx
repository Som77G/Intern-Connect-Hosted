import {createContext, useEffect, useState, useReducer} from "react";
export const NewMessageContext= createContext();

export const NewMessageReducer= (state, action)=>{
    switch(action.type){
        case 'GOT_MESSAGE':
            console.log("Got a new message")
            return{
                 hasNewMessage: "new_message"
            }
        case 'SEEN_MESSAGE':
            console.log("message seen")
            return{
                hasNewMessage: "seen_message"
            }
        case 'RESET':
            return{
                hasNewMessage: "default"
            }
        case 'NONE':
            return{
                hasNewMessage: 'none'
            }
        default:
            return state;
    }
}
export const NewMessageContextProvider= ({children})=>{
  const [state, dispatch]= useReducer(NewMessageReducer, {hasNewMessage: 'none'})
  return (
    <NewMessageContext.Provider value= {{...state, dispatch}}>
        {children}
    </NewMessageContext.Provider>
  )
}