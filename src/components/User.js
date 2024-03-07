import React from 'react'
import { Link } from 'react-router-dom'
import './User.css'

function User({_id, email, firstName, lastName}) {
  return (
    <div className='user_link'>
      <Link to={`/users/${_id}`}>{lastName} {firstName}</Link>
    </div>
  )
}

export default User
