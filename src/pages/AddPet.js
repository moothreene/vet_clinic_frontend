import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
function AddPet() {
    const [redirect,setRedirect] = useState(false)
    const userData = useSelector(state=>state.user)
    useEffect(()=>{
        axios.get("http://localhost:5000/admin",{withCredentials:true})
      .then(response=>{
        setRedirect(!response.data)
      })
    },[])
    const {id} = useParams()
    if(redirect) return <Navigate to="/" />
    return (
        <div>
            {userData.user?.isAdmin && id}
        </div>
    )
}

export default AddPet
