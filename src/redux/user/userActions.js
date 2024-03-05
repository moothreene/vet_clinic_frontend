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

export const updateUserRequest = ()=>{
    return{
        type:CONSTANTS.UPDATE_USER_REQUEST
    }
}

export const updateUserSuccess = ()=>{
    return{
        type:CONSTANTS.UPDATE_USER_SUCCESS
    }
}

export const updateUserFailure = (error)=>{
    return{
        type:CONSTANTS.UPDATE_USER_FAILURE,
        payload:error
    }
}

export const registerUser = (email,firstName,lastName,phoneNumber,password)=>{
    return (dispatch)=>{
        dispatch(registerUserRequest());
        const data = {email,firstName,lastName,phoneNumber,password}
        axios.post("http://localhost:5000/register", data, {withCredentials:true})
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

export const updateUser = ()=>{
    return (dispatch)=>{
        axios.get("http://localhost:5000/profile",{withCredentials:true})
        .then(response=>{
            if(response.data){
                dispatch(loginUserSuccess(response.data));
            }else{
                dispatch(loginUserFailure(response.data))
            }
        })
    }
}

export const updateOwner = (owner)=>{
    return{
        type:CONSTANTS.UPDATE_OWNER,
        payload:owner
    }
}

export const resetOwner = ()=>{
    return{
        type:CONSTANTS.RESET_OWNER,
    }
}

export const updateUserInfo = (id,email,firstName,lastName,phoneNumber)=>{
    return (dispatch)=>{
        dispatch(updateUserRequest());
        const data = {email,firstName,lastName,phoneNumber}
        axios.put(`http://localhost:5000/update/${id}`, data, {withCredentials:true})
        .then(response=>{
            dispatch(updateUserSuccess());
        })
        .catch(error=>{
            const errorMsg = error.response.data;
            dispatch(updateUserFailure(errorMsg));
        })
    }
}