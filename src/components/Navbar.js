import React, { useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { logoutUser } from '../redux'
import { useState } from 'react'
import { clearError,updateUser } from '../redux'
import './Navbar.css';
import { serverUrl } from '../Utils'

function Navbar() {
  const dispatch = useDispatch();
  const userData = useSelector(state=>state.user);
  const [location,setLocation] = useState(window.location.href);
  const [redirect,setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(clearError());
    dispatch(updateUser());
  },[])

  useEffect(()=>{
    setRedirect(false);
    setLocation(window.location.href)
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
          {location !== (window.location.origin+"/") && (
            <li className='go_back'>
              <div onClick={()=>{navigate(-1)}}>
                <img className="img_default" src={require(`../images/return.png`)} alt="return"/>
                <img className="img_hover" src={require(`../images/return_reverse.png`)} alt="return"/>
              </div>
            </li>
          )}
          {userData.user.isDoctor &&
            <li className="register">
              <Link className="link register" to="/register">Register</Link>
            </li>
          }
          <li>
            <div className="link logout" onClick={logout}>Logout</div>
          </li>
          <li><span>{userData.user.email}</span></li>
          <li className='search_link'>
            <Link className="link users" to="/users">
              <img className="img_default" src={require(`../images/search.png`)} alt="return"/>
                <img className="img_hover" src={require(`../images/search_reverse.png`)} alt="return"/>
            </Link>
          </li>
        </>)}       
    </ul>
  )
      
}

export default Navbar
