import React from 'react';
import { Link } from 'react-router-dom';
import './Manipulation.css';
import { getDate } from '../Utils';

function Manipulation({_id,date,doctor, purpose}) {
  return (
      <tr className='manipulation_preview'>
        <td className='date'><Link to={_id}>{getDate(date)["date"]}</Link></td>
        <td className='time'><Link to={_id}>{getDate(date)["time"]}</Link></td>
        <td className='purpose'><Link to={_id}>{purpose}</Link></td>
        <td className='doctor'><Link to={_id}>Dr. {doctor.firstName} {doctor.lastName}</Link></td>
      </tr>
    
  )
}

export default Manipulation
