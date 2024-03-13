import * as CONSTANTS from "./petTypes"
import axios from "axios"
import { serverUrl } from "../../Utils"

export const addPetRequest = ()=>{
    return{
        type:CONSTANTS.ADD_PET_REQUEST
    }
}

export const addPetSuccess = (pet)=>{
    return{
        type:CONSTANTS.ADD_PET_SUCCESS,
        payload:pet
    }
}

export const addPetFailure = (error)=>{
    return{
        type:CONSTANTS.ADD_PET_FAILURE,
        payload:error
    }
}

export const resetPet = ()=>{
    return{
        type:CONSTANTS.RESET_PET
    }
}

export const addPet = (id,name,species,breed,sex,birthday,weight)=>{
    return (dispatch)=>{
        dispatch(addPetRequest());
        const petData = {id,name,species,breed,sex,birthday,weight}
        axios.post(`${serverUrl}/addpet`,petData,{withCredentials:true}).then(
            response=>{
                dispatch(addPetSuccess(response.data))
            }
        ).catch(error=>{
            dispatch(addPetFailure(error.response.data))
        })
    }
}