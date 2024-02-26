import * as CONSTANTS from "./userTypes";
import axios from "axios";


export const loginUserRequest = ()=>{
    return{
        type:CONSTANTS.LOGIN_USER_REQUEST
    }
    
}

export const loginUserSuccess = (user)=>{
    return{
        type:CONSTANTS.LOGIN_USER_SUCCESS,
        payload:user
    }
    
}

export const loginUserFailure = (error)=>{
    return{
        type:CONSTANTS.LOGIN_USER_FAILURE,
        payload:error
    }
}

export const logoutUserRequest = ()=>{
    return{
        type:CONSTANTS.LOGOUT_USER_REQUEST
    }
}

export const logoutUserSuccess = ()=>{
    return{
        type:CONSTANTS.LOGOUT_USER_SUCCESS
    }
}

export const logoutUserFailure = ()=>{
    return{
        type:CONSTANTS.LOGOUT_USER_FAILURE
    }
}

export const registerUserRequest = ()=>{
    return{
        type:CONSTANTS.REGISTER_USER_REQUEST
    }
}

export const registerUserSuccess = ()=>{
    return{
        type:CONSTANTS.REGISTER_USER_SUCCESS
    }
}

export const registerUserFailure = (error)=>{
    return{
        type:CONSTANTS.REGISTER_USER_FAILURE,
        payload:error
    }
}

export const registerUser = (email, password)=>{
    return (dispatch)=>{
        dispatch(registerUserRequest());
        const data = {email,password}
        axios.post("http://localhost:5000/register", data)
        .then(response=>{
            dispatch(registerUserSuccess());
        })
        .catch(error=>{
            const errorMsg = error.response.data;
            dispatch(registerUserFailure(errorMsg));
        })
    }
}

export const logoutUser = ()=>{
    return(dispatch)=>{
        dispatch(logoutUserRequest())
        axios.post("http://localhost:5000/logout","",{withCredentials:true})
        .then(response=>{
            dispatch(logoutUserSuccess())
        })
        .catch(error=>{
            const errorMsg=error.message
            dispatch(logoutUserFailure(errorMsg))
        })

    }
}

export const loginUser = (email,password)=>{
    return (dispatch)=>{
        dispatch(loginUserRequest());
        const data = {email,password}
        axios.post("http://localhost:5000/login", data,{withCredentials:true})
        .then(response=>{
            const user = response.data;
            dispatch(loginUserSuccess(user));
        })
        .catch(error=>{
            const errorMsg = error.response.data;
            dispatch(loginUserFailure(errorMsg));
        })
    }
}

export const clearError = ()=>{
    return{
        type:CONSTANTS.CLEAR_ERROR
    }
}