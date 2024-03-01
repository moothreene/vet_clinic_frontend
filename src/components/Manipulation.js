import React from 'react'

function Manipulation({date,doctor, purpose}) {
  return (
    <div>
      <hr></hr>
        <div className='date'>{date}</div>
        <div className='doctor'>{doctor.email}</div>
        <div className='purpose'>{purpose}</div>
        <hr></hr>
    </div>
  )
}

export default Manipulation
