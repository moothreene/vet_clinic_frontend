import React from 'react'
import { useState } from 'react';
import { registerUser } from '../redux';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Register() {
    const dispatch = useDispatch();
    const userData = useSelector(state=>state.user)
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [password,setPassword] = useState("");
    const [redirect, setRedirect] = useState(false)

    function HandleSubmit(event){
        event.preventDefault();
        dispatch(registerUser(email,firstName,lastName,phoneNumber,password))
        setRedirect(true);
        
    }
    if (!userData.user || (userData.loading === false && userData.error===null && redirect===true)){return <Navigate to={"/"} />}
    return (
        <>
        <form className='register' onSubmit={HandleSubmit}>
            <label>Email</label>
            <br />
            <input  type="email"
                    required 
                    placeholder='Email' 
                    className='email'
                    value={email}
                    onChange={e=>(setEmail(e.target.value))}/>
            <br />
            <label>First Name</label>
            <br />
            <input  type="text" 
                    required 
                    placeholder='First Name' 
                    className='firstName'
                    value={firstName}
                    onChange={e=>setFirstName(e.target.value)} />
            <br />
            <label>Last Name</label>
            <br />
            <input  type="text" 
                    required 
                    placeholder='Last Name' 
                    className='lastName'
                    value={lastName}
                    onChange={e=>setLastName(e.target.value)} />
            <br />
            <label>Phone Number</label>
            <br />
            <input  type="text" 
                    required 
                    placeholder='Phone Number' 
                    className='phoneNumber'
                    value={phoneNumber}
                    onChange={e=>setPhoneNumber(e.target.value)} />
            <br />
            <label>Password</label>
            <br />
            <input  type="password" 
                    required 
                    placeholder='Password' 
                    className='password'
                    value={password}
                    onChange={e=>setPassword(e.target.value)} />
            <br />
            <button type="submit" className='register'>Register</button>
        </form>
        {userData.error!==null &&(
            <div>{userData.error}</div>
        )}
        </>
    )
}

export default Register
