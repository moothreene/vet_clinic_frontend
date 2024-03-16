import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { updateUserInfo } from '../redux';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import './UpdateUserInfo.css';
import { serverUrl } from '../Utils';

function UpdateUserInfo() {
    const {id} = useParams()
    const dispatch = useDispatch();
    const userData = useSelector(state=>state.user)
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [address,setAddress] = useState({city:"",street:"",misc:""});
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(userData.user){
            axios.get(`${serverUrl}/users/${id}`,{withCredentials:true}).then(
                response=>{
                    setEmail(response.data?.userData?.email)
                    setFirstName(response.data?.userData?.firstName)
                    setLastName(response.data?.userData?.lastName)
                    setPhoneNumber(response.data?.userData?.phoneNumber)
                    setAddress({
                        city:response.data?.userData?.city,
                        street:response.data?.userData?.street,
                        misc:response.data?.userData?.addressMisc
                    })
                }
            )
        }
    },[]);
    function HandleSubmit(event){
        event.preventDefault();
        dispatch(updateUserInfo(id,email,firstName,lastName,phoneNumber,address))
        setRedirect(true);
        
    }
    if (!userData.user || (userData.loading === false && userData.error===null && redirect===true)){
        return navigate(-1)
    }
    return (
        <div className='update'>
        <form autoComplete='off' className='update' onSubmit={HandleSubmit}>
            <input  type="email"
                    required 
                    placeholder='Email' 
                    className='email'
                    value={email}
                    onChange={e=>(setEmail(e.target.value))}/>
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
            <button type="submit" className='update'>Update</button>
            {userData.error!==null &&(
            <div className='update_error'>{JSON.stringify(userData.error)}</div>
        )}
        </form>
        </div>
    )
}

export default UpdateUserInfo
