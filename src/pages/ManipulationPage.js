import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { getDate,getAge } from '../Utils';
import './ManipulationPage.css';
import { serverUrl } from '../Utils';

function ManipulationPage() {
  const userData = useSelector(state=>state.user);
  const [manipulationData,setManipulationData] = useState({});
  const {id,manipulationId} = useParams();

  useEffect(()=>{
    axios.get(`${serverUrl}/manipulation/${manipulationId}`,{withCredentials:true}).then(
      response=>{
        setManipulationData(response.data);
        console.log(response.data);
      }
    )
  },[]);

  function HandleInputSwitch(){
    const inputFields = document.getElementsByClassName("manipulation_data");
    const selectButtons = document.getElementsByClassName("select_button")
    for(let inputField of inputFields){
        inputField.classList.toggle("hidden")
    }
    for(let selectButton of selectButtons){
        selectButton.classList.toggle("disabled");
    }
}

  if (!userData.user ||!(userData.user?.isDoctor || userData.user.id === id)) return <Navigate to="/" />
  return (
    <div className='manipulationPage'>
      <div className='left'>
        {userData.user?.isDoctor && (
            <Link className="manipulation_edit" to="edit">Edit</Link>
          )}
        <table className='manipulation_info_table'>
          <tr>
            <td className='manipulation_info_prefix'>Date:</td>
            <td className='manipulation_info_value'>{getDate(manipulationData?.date)["date"]}</td>
          </tr>
          <tr>
            <td className='manipulation_info_prefix'>Time:</td>
            <td className='manipulation_info_value'>{getDate(manipulationData?.date)["time"]}</td>
          </tr>
          <tr>
            <td className='manipulation_info_prefix'>Owner:</td>
            <td className='manipulation_info_value'>{userData?.owner?.firstName} {userData?.owner?.lastName}</td>
          </tr>
          <tr>
            <td className='manipulation_info_prefix'>Name:</td>
            <td className='manipulation_info_value'>{manipulationData?.pet_id?.name}</td>
          </tr>
          <tr>
            <td className='manipulation_info_prefix'>Species:</td>
            <td className='manipulation_info_value'>{manipulationData?.pet_id?.species}</td>
          </tr>
          <tr>
            <td className='manipulation_info_prefix'>Age:</td>
            <td className='manipulation_info_value'>{getAge(manipulationData?.pet_id?.birthday)}</td>
          </tr>
          <tr>
            <td className='manipulation_info_prefix'>Weight:</td>
            <td className='manipulation_info_value'>{manipulationData?.pet_id?.weight} kg.</td>
          </tr>
          <tr>
            <td className='manipulation_info_prefix'>Temperature:</td>
            <td className='manipulation_info_value'>{manipulationData?.temp}°C</td>
          </tr>
          <tr>
            <td className='manipulation_info_prefix'>Breed:</td>
            <td className='manipulation_info_value'>{manipulationData?.pet_id?.breed}</td>
          </tr>
          <tr>
            <td className='manipulation_info_prefix'>Purpose:</td>
            <td className='manipulation_info_value'>{manipulationData?.purpose}</td>
          </tr>
          <tr>
            <td className='manipulation_info_prefix'>Doctor:</td>
            <td className='manipulation_info_value'>
              {manipulationData?.doctor?.firstName}
              {" "}
              {manipulationData?.doctor?.lastName}
            </td>
          </tr>
        </table>
      </div>
      <div className='right'>
        <fieldset className='field desc'>
          <legend>
              <button type="button" className='desc select_button disabled' onClick={HandleInputSwitch}>Description</button>
              <button type="button" className='recommendation select_button' onClick={HandleInputSwitch}>Recommendation</button>
          </legend>
          <div className="desc manipulation_data" dangerouslySetInnerHTML={{__html:manipulationData.desc}}/>
          <div className="recommendation manipulation_data hidden" dangerouslySetInnerHTML={{__html:manipulationData.recommendation}}/>
        </fieldset>
      </div>
    </div>
  )
}

export default ManipulationPage
