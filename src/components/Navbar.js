import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { logoutUser } from '../redux'
import { useState } from 'react'
import { clearError,updateUser } from '../redux'

function Navbar() {
  const dispatch = useDispatch();
  const userData = useSelector(state=>state.user);
  const [redirect,setRedirect] = useState(false);

  useEffect(()=>{
    dispatch(clearError());
    dispatch(updateUser());
  },[])

  useEffect(()=>{
    if(redirect && userData.loading === false && userData.user===undefined && userData.error ===null){
      setRedirect(false);
    }
  })

  function logout(){
    setRedirect(true);
    dispatch(logoutUser())
  }

  if(redirect && userData.loading === false && userData.user===undefined && userData.error ===null){
    return(
    <Navigate to={"/"}></Navigate>
    )
  }

  return (
      (!userData.user)?(
        <>
        <Link to="/login">Login</Link>
        </>
      ):
        (<>
          <h2>{userData.user.email}</h2>
          <Link to="/browse">Browse</Link>
          <div onClick={logout}>Logout</div>
          {userData.user.isAdmin && <Link to="/register">Register</Link>}
        </>)          
  )
      
}

export default Navbar
