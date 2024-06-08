import { createContext, useReducer } from "react";

export const MyApplicationsContext= createContext();
export const MyApplicationsReducer= (state, action)=>{
    switch(action.type){
        case 'SET_APPLICATIONS':
            console.log("initialising applications inside myApplications context");
            return{
                myApplications: action.payload
            }
        case 'ADD_APPLICATION':
            console.log("adding new application inside myApplications context");
            let newApplications=[];
            if(state && state.myApplications){
                newApplications= [action.payload, ...state.myApplications];

            }else{
                newApplications= [act.payload];
            }
            return{
                myApplications: newApplications
            }
        case 'DELETE_APPLICATION':
            console.log("deleting application inside myApplication");
            return{
                myApplications: state.myApplications.filter(application=>
                    application.id!==action.payload
                )
            }
    }
}


export const MyApplicationsProvider= ({children})=>{
    const [state, dispatch]= useReducer(MyApplicationsReducer,{myApplications: null});
    return(
        <MyApplicationsContext.Provider value={{...state, dispatch}}>
            {children}
        </MyApplicationsContext.Provider>
    )
}