import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, json, useParams } from 'react-router-dom'
import Manipulation from '../components/Manipulation';
import { useSelector } from 'react-redux';

function PetPage() {
    const {id, petId} = useParams();
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

    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);

    if (!userData.user ||!(userData.user?.isDoctor || userData.user.id === id)) return <Navigate to="/" />
    return (
        <div>
            <h1>{petData.name}</h1>
            <div>{getAge(petData.birthday)} y.o.</div>
            <div>{Math.floor(petData.weight/1000)} kg</div>
            <div>{petData.sex}</div>
            <div>{petData.species}</div>
            <div>{petData.breed}</div>
            <br />
            <hr></hr>
            {userData?.user?.isDoctor && (
                <Link to="add">Add Manipulation</Link>
            )}
            <br />
            {manipulations.map(manipulation=>{
                const {_id, date, doctor, purpose} = manipulation;
                const data = {_id, date, doctor, purpose}
                return(
                   <Manipulation {...data}></Manipulation>
                )
            })}
        </div>
    )
    }

export default PetPage
