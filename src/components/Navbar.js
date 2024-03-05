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
    setRedirect(false);
  })

  function logout(){
    setRedirect(true);
    dispatch(logoutUser());
  }

  return (
      (!userData.user)?(
        <>
        <Link to="/login">Login</Link>
        </>
      ):
        (<>
          <h4>{userData.user.email}</h4>
          <Link to="/users">Browse</Link>
          <div onClick={logout}>Logout</div>
          {userData.user.isDoctor && <Link to="/register">Register</Link>}
        </>)          
  )
      
}

export default Navbar
