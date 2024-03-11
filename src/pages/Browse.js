import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import User from '../components/User';
import { Navigate } from 'react-router-dom';
import "./Browse.css"
import PetBrowse from '../components/PetBrowse';

function Browse() {
  const[pets,setPets] = useState([]);
  const[users,setUsers] = useState([]);
  const[filteredPets,setFilteredPets] = useState([]);
  const[filteredUsers,setFilteredUsers] = useState([]);
  const[searchQuery, setSearchQuery] = useState("");
  const userData = useSelector(state=>state.user);
  const[searchSelection, setSearchSelection] = useState("pets");

  useEffect(()=>{
    if(userData.user){
      axios.get("http://localhost:5000/pets",{withCredentials:true})
      .then(response=>{
        setPets(response.data);
      })
      axios.get("http://localhost:5000/users",{withCredentials:true})
      .then(response=>{
        setUsers(response.data);
      })
    }
  },[]);

  function search(term,target){
    if(term !==""){
      if(target==="pets"){
        return pets.filter(petData=>petDataContains(petData,term));
      }
      if(target==="clients"){
        return users.filter(usersData=>userDataContains(usersData,term));
      }
    }else{
      return [];
    }
  }

  function petDataContains(data, term){
    const result = (data?.name.toLowerCase().includes(term.toLowerCase())||
      data?.owner_id?.firstName.toLowerCase().includes(term.toLowerCase())||
      data?.owner_id?.lastName.toLowerCase().includes(term.toLowerCase()))
    return result
  }

  function userDataContains(data, term){
    const result = (data?.firstName.toLowerCase().includes(term.toLowerCase())||
    data?.lastName.toLowerCase().includes(term.toLowerCase()))
    return result
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setFilteredPets(search(searchQuery,"pets"))
      setFilteredUsers(search(searchQuery,"clients"))
    }, 300);
    return () => clearTimeout(timeOutId);
  }, [searchQuery]);



  if (!userData.user) return <Navigate to="/" />
  if (!userData.user.isDoctor) return <Navigate to={userData.user.id} />
  return (
    <div className='browse'>
      <div className='browse_container'>
        <input
          className='search'
          value={searchQuery}
          placeholder='Search...'
          onChange={event=>{setSearchQuery(event.target.value)}}    
        />
        <div className='radio_buttons'>
          <div className='radio_pets'>
            <input
              type="radio"
              className='pets'
              id='pets'
              checked={searchSelection==="pets"}
              value={searchSelection}
              onClick={()=>setSearchSelection("pets")}
            />
            <label for="pets">Pets</label>
          </div>
          <div className='radio_clients'>
            <input 
              type="radio"
              className='clients'
              id='clients'
              checked={searchSelection==="clients"}
              value={searchSelection}
              onClick={()=>setSearchSelection("clients")}
            />
            <label for="clients">Clients</label>
          </div>
        </div>
        <div className='results_container'>
          <table className='results_table'>
            {searchSelection==="clients" && (
              filteredUsers.map(user=>{
                return(<User key={user._id} {...user} />)
              })
            )}
            
            {searchSelection==="pets" && (
              filteredPets.map(pet=>{
                return(<PetBrowse key={pet._id} {...pet} />)
              })
            )}
          </table>
        </div>
      </div>
    </div>
    
  )
}

export default Browse
