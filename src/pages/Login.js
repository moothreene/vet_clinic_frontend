import React, { useEffect } from 'react'
import { useState } from 'react';
import { clearError, loginUser } from '../redux';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userData = useSelector(state=>state.user)
    function HandleSubmit(event){
        event.preventDefault();
        dispatch(loginUser(email,password))
    }

    useEffect(()=>{
        dispatch(clearError())
    },[])
    
    return (
        userData.user?(<Navigate to={"/"}/>):(
        <>
        <form className='login' onSubmit={HandleSubmit}>
            <label>Email</label>
            <br />
            <input  type="email"
                    required 
                    placeholder='Email' 
                    className='email'
                    value={email}
                    onChange={e=>(setEmail(e.target.value))}/>
            <br />
            <label>Password</label>
            <br />
            <input  type="password" 
                    required 
                    placeholder='Password' 
                    className='password'
                    value={password}
                    onChange={e=>setPassword(e.target.value)} />
            <button type="submit" className='login'>Login</button>
        </form>
        {userData.error!==null &&(
            <div>{userData.error}</div>
        )}
        </>
        )
    )
}

export default Login
