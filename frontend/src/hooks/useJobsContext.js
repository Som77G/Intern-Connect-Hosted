import { JobsContext } from "../context/JobsContext";
import { useContext } from "react";
export const useJobsContext= ()=>{
    const context= useContext(JobsContext);
    if(!context){
        throw Error("useJobs must be used inside an useJobsContextProvider");
    }

    return context;
}
