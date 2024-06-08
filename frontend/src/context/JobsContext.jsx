import { useReducer, createContext } from "react";




export const JobsContext= createContext();
export const JobsReducer= (state, action)=>{
    switch(action.type){
        case 'SET_JOBS':
            console.log("initialising jobs inside jobs context");
            return {
                jobs: action.payload
            }
        
        case 'ADD_JOB':
            console.log("adding new job to jobs context");
            let newJobs=[];
            if(state && state.jobs){
                newJobs= [action.payload, ...state.jobs];
            }else{
                newJobs= [action.payload];
            }
            console.log("inside add_job:",newJobs);
            return{
                jobs: newJobs
            }
        case 'DELETE_JOB':
            return{
                jobs: state.jobs.filter(job => job.id !==action.payload)
            }
        default:
            return state;
    }
}


export const JobsContextProvider= ({children})=>{
    const [state, dispatch]= useReducer(JobsReducer, {jobs: null});
    return (
       < JobsContext.Provider value= {{...state, dispatch}}>
        {children}
       </JobsContext.Provider>
    )
}