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
    function getAge(birthDate){
        const today = new Date();
        const birthDayDate = new Date(birthDate);
        let age = today.getFullYear() - birthDayDate.getFullYear();
        const monthDiff = today.getMonth() - birthDayDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDayDate.getDate())) {
            age--;
        }
        let result = "";
        if(age > 0){
            result += (age+" y.")
        }
        if(monthDiff<0){
            result+= ((result?" ":"")+(12+monthDiff) + " m.")
        }else if(monthDiff>0){
            result += ((result?" ":"")+monthDiff + " m. ")
        }
        return result;
    }
    

    if (!userData.user ||!(userData.user?.isDoctor || userData.user.id === id)) return <Navigate to="/" />
    return (
        <div>
            <Link to=".." relative="path">Owner:{petData.owner_id?.lastName} {petData.owner_id?.firstName}</Link>
            <h1>{petData.name}</h1>
            <div>{getAge(petData.birthday)}o.</div>
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
