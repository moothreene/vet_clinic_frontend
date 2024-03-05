import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

function ManipulationPage() {
  const userData = useSelector(state=>state.user);
  const [manipulationData,setManipulationData] = useState({});
  const {id,manipulationId} = useParams();
  console.log(manipulationId)

  useEffect(()=>{
    axios.get(`http://localhost:5000/manipulation/${manipulationId}`,{withCredentials:true}).then(
      response=>{
        setManipulationData(response.data)
      }
    )
  },[])

  if (!userData.user ||!(userData.user?.isDoctor || userData.user.id === id)) return <Navigate to="/" />
  return (
    <div>
        {userData.user?.isDoctor && (
          <Link to="edit">Edit</Link>
        )}
        <div className='date'>{manipulationData.date}</div>
        <div className='doctor'>Dr. {manipulationData?.doctor?.firstName} {manipulationData?.doctor?.lastName}</div>
        <div className='weight'>{manipulationData.weight}</div>
        <div className='temp'>{manipulationData.temp}</div>
        <div className='purpose'>{manipulationData.purpose}</div>
        <div className="desc" dangerouslySetInnerHTML={{__html:manipulationData.desc}}/>
        <div className="recommendation" dangerouslySetInnerHTML={{__html:manipulationData.recommendation}}/>
    </div>
  )
}

export default ManipulationPage
