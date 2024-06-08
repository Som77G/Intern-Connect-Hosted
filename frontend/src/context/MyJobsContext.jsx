import { useReducer, createContext } from "react";

export const MyJobsContext= createContext();
export const MyJobsReducer= (state, action)=>{
    switch(action.type){
        case 'SET_MYJOBS':
            console.log("initialising jobs inside myJobs context");
            return {
                myJobs: action.payload
            }
        
        case 'ADD_MYJOB':
            console.log("adding new job to myJobs context");
            let newJobs=[];
            if(state && state.myJobs){
                newJobs= [action.payload, ...state.myJobs];
            }else{
                newJobs= [action.payload];
            }
            console.log("inside add_myJob:",newJobs);
            return{
                myJobs: newJobs
            }
        
        case 'UPDATE_MYJOB':
            console.log("updating myJob inside myJobs context");
            return{
                myJobs: state.myJobs.map(myJob=>
                   myJob.id===action.payload.id ? {...myJob, ...action.payload} : myJob
                )
            }
        case 'DELETE_MYJOB':
            console.log("Deleting myJob inside myJob context");
            return{
                myJobs: state.myJobs.filter(myJob => myJob.id !==action.payload)
            }
        default:
            return state;
    }
}


export const MyJobsContextProvider= ({children})=>{
    const [state, dispatch]= useReducer(MyJobsReducer, {myJobs: null});
    return (
       < MyJobsContext.Provider value= {{...state, dispatch}}>
        {children}
       </MyJobsContext.Provider>
    )
}