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
                <img className="img_default" src={require(`../images/return.png`)} alt="return"/>
                <img className="img_hover" src={require(`../images/return_reverse.png`)} alt="return"/>
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
              <img className="img_default" src={require(`../images/search.png`)} alt="return"/>
                <img className="img_hover" src={require(`../images/search_reverse.png`)} alt="return"/>
        </>)}       
    </ul>
  )
      
}

export default Navbar
