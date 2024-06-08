import { NewMessageContext } from "../context/NewMessageContext";
import {useContext} from 'react';

export const useNewMessageContext= ()=>{
    const context= useContext(NewMessageContext);
    if(!context){
        throw Error('useNewMessage must be used inside an useNewMessageContextProvider');
    }
    return context;
}