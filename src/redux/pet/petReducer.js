import * as CONSTANTS from './petTypes'

const initialState = {
    loading:false,
    error:null,
    pet:undefined
}

const petReducer = (state=initialState, action)=>{
    switch(action.type){
        case CONSTANTS.ADD_PET_REQUEST: return{
            ...state,
            loading:true,
        }
        case CONSTANTS.ADD_PET_SUCCESS: return{
            loading:false,
            error:null,
            pet:action.payload
        }
        case CONSTANTS.ADD_PET_FAILURE: return{
            loading:false,
            error:action.payload,
            pet:undefined
        }
        case CONSTANTS.RESET_PET: return initialState

        default:return state
    }
}

export default petReducer