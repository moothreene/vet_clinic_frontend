import React from 'react'
import { Link } from 'react-router-dom'
function Manipulation({_id,date,doctor, purpose}) {
  return (
    <Link to={_id}>
      <div>
        <hr></hr>
        <div className='date'>{date}</div>
        <div className='doctor'>Dr. {doctor.firstName} {doctor.lastName}</div>
        <div className='purpose'>{purpose}</div>
        <hr></hr>
      </div>
    </Link>
    
  )
}

export default Manipulation
