import React from 'react'

function Manipulation({date,petId, weight, temp, purpose, desc, recommendation}) {
  return (
    <div>
        <div className='date'>{date}</div>
        <div className='weight'>{weight}</div>
        <div className='temp'>{temp}</div>
        <div className='purpose'>{purpose}</div>
        <div className="desc" dangerouslySetInnerHTML={{__html:desc}}/>
        <div className="recommendation" dangerouslySetInnerHTML={{__html:recommendation}}/>
    </div>
  )
}

export default Manipulation
