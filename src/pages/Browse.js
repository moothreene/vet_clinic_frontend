import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import User from '../components/User';
import { Navigate } from 'react-router-dom';
import "./Browse.css"

function Browse() {
  const[users,setUsers] = useState([]);
  const[filteredUsers,setFilteredUsers] = useState([]);
  const[searchQuery, setSearchQuery] = useState("");
  const userData = useSelector(state=>state.user);

  useEffect(()=>{
    if(userData.user){
      axios.get("http://localhost:5000/users",{withCredentials:true})
      .then(response=>{
        setUsers(response.data);
      })
    }
  },[]);

  function searchUsers(term){
    if(term !==""){
      return users.filter(user=>user.email.toLowerCase().includes(term.toLowerCase()));
    }else{
      return [];
    }
    
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => setFilteredUsers(searchUsers(searchQuery)), 300);
    return () => clearTimeout(timeOutId);
  }, [searchQuery]);



  if (!userData.user) return <Navigate to="/" />
  if (!userData.user.isDoctor) return <Navigate to={userData.user.id} />
  return (
    <div className='browse'>
      <input 
        className='search'
        value={searchQuery}
        placeholder='Search for users...'
        onChange={event=>{setSearchQuery(event.target.value)
        console.log("hey"+event.target.value+"hey")}}    
      />
      <div className='clients_container'>
        {
          filteredUsers.map(user=>{
            return(<User key={user._id} {...user} />)
          })
        }
      </div>
    </div>
    
  )
}

export default Browse
