import React from 'react'
import Pet from '../components/Pet';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function UserPage() {
    const {id} = useParams();
    const usersData = useSelector(state=>state.user)

    if(usersData.user?.id===id || usersData.user?.isAdmin)
    return (
        <>
            {usersData.user?.isAdmin && <Link to={"addpet"} >AddPet</Link>}
            {id}
            <Pet />
            <Pet />
            <Pet />
        </>
    )
    return <Navigate to="/"></Navigate>
}

export default UserPage
