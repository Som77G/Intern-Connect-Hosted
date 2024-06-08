import { MyApplicationsContext } from "../context/MyApplicationsContext";
import { useContext } from "react";
export const useMyApplicationsContext= ()=>{
    const context= useContext(MyApplicationsContext);
    if(!context){
        throw Error("useApplications must be inside an useApplications provider");
    }
    return context;
}