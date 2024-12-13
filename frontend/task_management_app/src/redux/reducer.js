
import { DELETE_TASK, ERROR, GET_TASKS, LOADING,  LOGIN,  LOGOUT,  PATCH_TASK,  POST_TASKS, SIGNUP, Signup } from './actionTypes'

const initialState ={
    tasks :[],
    user:{},
    isLoading:false,
    isError:false,
    token:"",
}

 export const reducer = (state=initialState, {type,payload}) => {
    switch(type){
        case LOADING: {
            return {...state, isLoading:true}
        }
        case ERROR: {
            return {...state, isLoading:false, isError:true}
        }
        case GET_TASKS: {
            return {...state, isLoading:false, tasks:payload}
        }
        case POST_TASKS: {
            return {...state, isLoading:false, tasks:[...state.tasks,payload]}
        }
        case PATCH_TASK: {
            return {...state, isLoading:false}
        }
        case DELETE_TASK: {
            return {...state, isLoading:false}
        }
        case SIGNUP: {
            return {...state, isLoading:false}
        }
        case LOGIN: {
            return {...state, isLoading:false , token: payload.token,user:payload.user}
        }
        case LOGOUT: {
            return initialState
        }
        default : {
            return state 
        }
    }
}