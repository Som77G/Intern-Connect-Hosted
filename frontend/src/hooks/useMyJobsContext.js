import { MyJobsContext } from "../context/MyJobsContext";
import { useContext } from "react";
export const useMyJobsContext= ()=>{
    const context= useContext(MyJobsContext);
    if(!context){
        throw Error("useJobs must be used inside an useJobsContextProvider");
    }

    return context;
}
