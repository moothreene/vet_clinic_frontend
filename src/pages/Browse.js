import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import User from '../components/User';

function Browse() {
  const[users,setUsers] = useState([]);
  const userData = useSelector(state=>state.user);
  useEffect(()=>{
    if(userData.user){
      axios.get("http://localhost:5000/users",{withCredentials:true})
      .then(response=>{
        setUsers(response.data)
      })
    }
  },[])
  if(userData.user)
  return (
    <div>
      {
        users.map(user=>{
          return(<User key={user._id} {...user} />)
        })
      }
    </div>
  )
}

export default Browse
