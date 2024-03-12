import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, json, useParams } from 'react-router-dom'
import Manipulation from '../components/Manipulation';
import { useSelector } from 'react-redux';
import './PetPage.css';

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
        petData &&(
            <div className='petPage_container'>
                <div className='pet_info_container'>
                    <Link to=".." relative="path">
                        Owner: {petData.owner_id?.lastName}
                        {" "}{petData.owner_id?.firstName}
                        {" - "}<div className='phoneNumber'>{petData.owner_id?.phoneNumber}</div>
                    </Link>
                    <table className='pet_info_table'>
                        <tr>
                            <td className='pet_info_prefix'>Name:</td>
                            <td className='pet_info_value'>{petData.name}</td>
                        </tr>
                        <tr>
                            <td className='pet_info_prefix'>Age:</td>
                            <td className='pet_info_value'>{getAge(petData.birthday)}o.</td>
                        </tr>
                        <tr>
                            <td className='pet_info_prefix'>Weight:</td>
                            <td className='pet_info_value'>{petData.weight/1000} kg</td>
                        </tr>
                        <tr>
                            <td className='pet_info_prefix'>Sex:</td>
                            <td className='pet_info_value'>{petData.sex}</td>
                        </tr>
                        <tr>
                            <td className='pet_info_prefix'>Species:</td>
                            <td className='pet_info_value'><div>{petData.species}</div></td>
                        </tr>
                        <tr>
                            <td className='pet_info_prefix'>Breed:</td>
                            <td className='pet_info_value'><div>{petData.breed}</div></td>
                        </tr>
                    </table>  
                </div>
                <div className='manipulations_container'>
                    <table className='manipulations_table'>
                    <tr className='manipulations_header'>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Purpose</th>
                        <th>Doctor</th>
                    </tr>
                    {manipulations.map(manipulation=>{
                        const {_id, date, doctor, purpose} = manipulation;
                        const data = {_id, date, doctor, purpose}
                        return(
                        <Manipulation {...data}></Manipulation>
                        )
                    })}
                    </table>
                    {userData?.user?.isDoctor && (
                        <Link className="link_add" to="add">
                            <img className="img_default" src={require(`../images/add.png`)} alt="addman"/>
                            <img className="img_hover" src={require(`../images/add_reverse.png`)} alt="addman"/>
                        </Link>
                    )}
                </div>
            </div>
        )
    )
    }

export default PetPage
