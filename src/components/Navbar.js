import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { logoutUser } from '../redux'
import { useState } from 'react'
import { clearError,updateUser } from '../redux'
import './Navbar.css';

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
    <ul className='navbar'>
      {(!userData.user)?(
        <li>
        <Link className="link login" to="/login">Login</Link>
        </li>
      ):
        (<>
          {userData.user.isDoctor &&
            <li className="register">
              <Link className="link register" to="/register">Register</Link>
            </li>
          }
          <li>
            <Link className="link users" to="/users">{userData.user.email}</Link>
          </li>
          <li>
            <div className="link logout" onClick={logout}>Logout</div>
          </li>
        </>)}       
    </ul>
  )
      
}

export default Navbar
