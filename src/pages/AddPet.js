import React, { useEffect, useState } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { addPet, resetPet } from '../redux/pet/petActions';
import './AddPet.css';
import { serverUrl } from '../Utils';

function AddPet() {
    const dispatch = useDispatch()
    const [redirect,setRedirect] = useState(false)
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [breed, setBreed] = useState("");
    const [sex, setSex] = useState("");
    const [birthday, setBirthday] = useState("");
    const [weight, setWeight] = useState("");
    const userData = useSelector(state=>state.user);
    const petData = useSelector(state=>state.pet);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
      dispatch(resetPet());
        axios.get(`${serverUrl}/admin`,{withCredentials:true})
      .then(response=>{
        setRedirect(!response.data)
      })
    },[])

    function HandleSubmit(event){
      event.preventDefault();
      dispatch(addPet(id,name,species,breed,sex,birthday,weight)); 
    }

    if(petData.pet){
      return navigate(-1)
    }
    if(redirect) return navigate(-1)
    return (
        <div className='addpet'>
          {(userData.owner && userData.user?.isDoctor) &&
            (
              <form className='addpet' onSubmit={HandleSubmit}>
                <div className='addpet_header'>Add new pet for {userData?.owner.lastName} {userData?.owner.firstName}:</div>
                <input
                  className='name'
                  type="text"
                  required
                  placeholder='Name'
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
                <br />
                <select 
                  className='species'
                  type="text"
                  required
                  value={species}
                  onChange={(e)=>setSpecies(e.target.value)}>
                  <option value="" disabled selected hidden>Select species...</option>
                  <option value="Cat">Cat</option>
                  <option value="Dog">Dog</option>
                  <option value="Rodent">Rodent</option>
                  <option value="Bird">Bird</option>
                  <option value="Exotic">Exotic</option>
                </select>
                <br />
                <input
                  className='breed'
                  type="text"
                  required
                  placeholder='Breed'
                  value={breed}
                  onChange={(e)=>setBreed(e.target.value)}
                />
                <br />
                <select 
                  className='sex'
                  type="text"
                  required
                  value={sex}
                  onChange={(e)=>setSex(e.target.value)}>
                  <option value="" disabled selected hidden>Select sex...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <br />
                <input
                  className='birthday'
                  type="date"
                  required
                  placeholder='Birthday'
                  max="9999-12-31"
                  value={birthday}
                  onChange={(e)=>{
                    setBirthday(e.target.value)
                  }}
                  
                />
                <br />
                <input
                  className='weight'
                  type="number"
                  required
                  placeholder='Weight'
                  value={weight}
                  onChange={(e)=>setWeight(e.target.value)}
                />
              <button
                type="submit" className='addpet'>Submit</button>
              <button
                type="button" onClick={()=>navigate(-1)} className='cancel'>Cancel</button>
              </form>
            )}
        </div>
    )
}

export default AddPet
