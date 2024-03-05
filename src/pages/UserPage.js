import React, { useEffect, useState } from 'react'
import Pet from '../components/Pet';
import axios from 'axios';
import { useParams, Navigate, Link} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { updateOwner, resetOwner} from '../redux';
function UserPage() {
    const {id} = useParams();
    const usersData = useSelector(state=>state.user)
    const [petData, setPetData] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(resetOwner())
        if(usersData.user){
            axios.get(`http://localhost:5000/users/${id}`,{withCredentials:true}).then(
            response=>{
                setPetData(response.data.petData)
                dispatch(updateOwner(response.data?.userData))
            }
        )
        }
    },[])

    if(usersData.user?.id===id || usersData.user?.isDoctor)
    return (
        <>
            {usersData.user?.isDoctor && (
            <>
                <Link to={"update"} >Update User Info</Link>
                <Link to={"addpet"} >AddPet</Link>
            </>)}
            <br />
            {usersData?.owner &&(
                <>
                <h2>{usersData.owner.firstName} {usersData.owner.lastName}</h2>
                <div>{usersData.owner.email}</div>
                <div>{usersData.owner.phoneNumber}</div>
                </>
            )}
            {petData.map(pet=>{
                return(
                    <Pet {...pet} key={pet._id} />
                )
            })}
        </>
    )
    return <Navigate to="/"></Navigate>
}

export default UserPage
