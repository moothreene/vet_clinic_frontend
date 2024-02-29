import React from 'react'
import { useState } from 'react';
import { registerUser } from '../redux';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

function Register() {
    const dispatch = useDispatch();
    const userData = useSelector(state=>state.user)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false)

    function HandleSubmit(event){
        event.preventDefault();
        dispatch(registerUser(email,password))
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
            <label>Password</label>
            <br />
            <input  type="password" 
                    required 
                    placeholder='Password' 
                    className='password'
                    value={password}
                    onChange={e=>setPassword(e.target.value)} />
            <button type="submit" className='register'>Register</button>
        </form>
        {userData.error!==null &&(
            <div>{userData.error}</div>
        )}
        </>
    )
}

export default Register
