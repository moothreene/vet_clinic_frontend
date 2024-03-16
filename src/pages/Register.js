import React from 'react'
import { useState } from 'react';
import { registerUser } from '../redux';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import "./Register.css"

function Register() {
    const dispatch = useDispatch();
    const userData = useSelector(state=>state.user)
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [address,setAddress] = useState({city:"",street:"",misc:""});
    const [password,setPassword] = useState("");
    const [redirect, setRedirect] = useState(false)

    function HandleSubmit(event){
        event.preventDefault();
        dispatch(registerUser(email,firstName,lastName,phoneNumber,address,password))
        setRedirect(true);
        
    }
    if (!userData.user || (userData.loading === false && userData.error===null && redirect===true)){return <Navigate to={"/"} />}
    return (
        <div className='register'>
        <form autoComplete="off" className='register' onSubmit={HandleSubmit}>
                <input  type="text" 
                    required 
                    placeholder='First Name' 
                    className='firstName'
                    value={firstName}
                    onChange={e=>setFirstName(e.target.value)} />
                <input  type="text" 
                    required 
                    placeholder='Last Name' 
                    className='lastName'
                    value={lastName}
                    onChange={e=>setLastName(e.target.value)} />
                <input  type="text" 
                    required 
                    placeholder='Phone Number' 
                    className='phoneNumber'
                    value={phoneNumber}
                    onChange={e=>setPhoneNumber(e.target.value)} />
                <input  type="email"
                    required 
                    placeholder='Email' 
                    className='email'
                    value={email}
                    onChange={e=>(setEmail(e.target.value))}/>
                <input  type="text" 
                    required 
                    placeholder='City' 
                    className='city'
                    value={address.city}
                    onChange={e=>setAddress(address=>({
                        ...address,
                        city:e.target.value
                    }))} />
                <input  type="text" 
                    required 
                    placeholder='Street' 
                    className='street'
                    value={address.street}
                    onChange={e=>setAddress(address=>({
                        ...address,
                        street:e.target.value
                    }))} />
                <input  type="text" 
                    required 
                    placeholder='Address misc' 
                    className='misc'
                    value={address.misc}
                    onChange={e=>setAddress(address=>({
                        ...address,
                        misc:e.target.value
                    }))} />
                <input  type="password" 
                    required 
                    placeholder='Password' 
                    className='password'
                    value={password}
                    onChange={e=>setPassword(e.target.value)} />
                <button type="submit" className='register'>Register</button>
                {userData.error!==null &&(
                        <div className='register_error'>{userData.error}</div>
        )}
        </form>
        </div>
    )
}

export default Register
