import React from 'react';
import { Link } from 'react-router-dom';
import './Manipulation.css';

function Manipulation({_id,date,doctor, purpose}) {
  function getDate(){
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return {
      "date":[year, month, day].join('-'),
      "time":[hour, minute].join(':')
    }
  }
  return (
      <tr className='manipulation_preview'>
        <td className='date'><Link to={_id}>{getDate().date}</Link></td>
        <td className='time'><Link to={_id}>{getDate().time}</Link></td>
        <td className='purpose'><Link to={_id}>{purpose}</Link></td>
        <td className='doctor'><Link to={_id}>Dr. {doctor.firstName} {doctor.lastName}</Link></td>
      </tr>
    
  )
}

export default Manipulation
