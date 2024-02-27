import * as CONSTANTS from "./userTypes";

const initialState = {
    loading:false,
    user:undefined,
    error:null,
    owner:undefined
}

const userReducer = (state=initialState, action)=>{
    switch(action.type){
        case CONSTANTS.LOGIN_USER_REQUEST: return{
            ...state,
            loading:true,
        }
        case CONSTANTS.LOGIN_USER_SUCCESS: return{
            ...state,
            loading:false,
            user:action.payload,
            error:null
        }
        case CONSTANTS.LOGIN_USER_FAILURE: return{
            ...state,
            loading:false,
            user:undefined,
            error:action.payload
        }
        case CONSTANTS.LOGOUT_USER_REQUEST: return{
            ...state,
            loading:true,
        }
        case CONSTANTS.LOGOUT_USER_SUCCESS: return{
            ...state,
            loading:false,
            user:undefined,
            error:null
        }
        case CONSTANTS.LOGOUT_USER_FAILURE: return{
            ...state,
            loading:false,
            error:action.payload
        }
        case CONSTANTS.REGISTER_USER_REQUEST: return{
            ...state,
            loading:true,
            error:null
        }
        case CONSTANTS.REGISTER_USER_SUCCESS: return{
            ...state,
            loading:false,
            error:null
        }
        case CONSTANTS.REGISTER_USER_FAILURE: return{
            ...state,
            loading:false,
            error:action.payload
        }
        case CONSTANTS.CLEAR_ERROR: return{
            ...state,
            error:null
        }
        case CONSTANTS.UPDATE_OWNER: return{
            ...state,
            owner:action.payload
        }
        case CONSTANTS.RESET_OWNER: return{
            ...state,
            owner:undefined
        }
        default: return state
    }
}

export default userReducer