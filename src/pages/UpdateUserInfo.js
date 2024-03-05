import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { registerUser, updateUserInfo } from '../redux';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

function UpdateUserInfo() {
    const {id} = useParams()
    const dispatch = useDispatch();
    const userData = useSelector(state=>state.user)
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        if(userData.user){
            axios.get(`http://localhost:5000/users/${id}`,{withCredentials:true}).then(
                response=>{
                    setEmail(response.data?.userData?.email)
                    setFirstName(response.data?.userData?.firstName)
                    setLastName(response.data?.userData?.lastName)
                    setPhoneNumber(response.data?.userData?.phoneNumber)
                }
            )
        }
    },[]);
    function HandleSubmit(event){
        event.preventDefault();
        dispatch(updateUserInfo(id,email,firstName,lastName,phoneNumber))
        setRedirect(true);
        
    }
    if (!userData.user || (userData.loading === false && userData.error===null && redirect===true)){return <Navigate to={"/"} />}
    return (
        <>
        <form className='update' onSubmit={HandleSubmit}>
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
            <button type="submit" className='register'>Register</button>
        </form>
        {userData.error!==null &&(
            <div>{userData.error}</div>
        )}
        </>
    )
}

export default UpdateUserInfo
