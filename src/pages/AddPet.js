import React, { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import { addPet, resetPet } from '../redux/pet/petActions'

function AddPet() {
    const dispatch = useDispatch()
    const [redirect,setRedirect] = useState(false)
    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [breed, setBreed] = useState("");
    const [sex, setSex] = useState("male");
    const [birthday, setBirthday] = useState("");
    const [weight, setWeight] = useState("");
    const userData = useSelector(state=>state.user);
    const petData = useSelector(state=>state.pet);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
      dispatch(resetPet());
        axios.get("http://localhost:5000/admin",{withCredentials:true})
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
        <div>
          {userData.owner && <div>Add new pet for {userData?.owner.email}:</div>}
            {userData.user?.isDoctor && (
              <form className='addpet' onSubmit={HandleSubmit}>
                <input
                  className='name'
                  type="text"
                  required
                  placeholder='Name'
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
                <br />
                <input
                  className='species'
                  type="text"
                  required
                  placeholder='Spcies'
                  value={species}
                  onChange={(e)=>setSpecies(e.target.value)}
                />
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
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <br />
                <input
                  className='birthday'
                  type="date"
                  required
                  placeholder='Birthday'
                  value={birthday}
                  onChange={(e)=>setBirthday(e.target.value)}
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
                type="submit">Submit</button>
              </form>
            )}
        </div>
    )
}

export default AddPet
