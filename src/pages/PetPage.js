import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Manipulation from '../components/Manipulation';
import { useSelector } from 'react-redux';

function PetPage() {
    const {petId} = useParams();
    const [petData,setPetData] = useState([]);
    const [manipulations, setManipulations] = useState([]);
    const userData = useSelector(state=>state.user);
    useEffect(()=>{
        if (userData.user){
            axios.get(`http://localhost:5000/pet/${petId}`,{withCredentials:true}).then(
            response=>{
                setPetData(response.data.petData)
                setManipulations(response.data.manipulations)
            }
        )
        }
    },[]);
    if (!userData.user) return <Navigate to="/" />
    return (
        <div>
            <h1>{petData.name}</h1>
            {JSON.stringify(petData)}
            <br />
            {userData?.user?.isAdmin && (
                <Link to="add">Add Manipulation</Link>
            )}
            <br />
            {manipulations.map(manipulation=>{
                return(
                    <Manipulation {...manipulation}></Manipulation>
                )
            })}
        </div>
    )
    }

export default PetPage
