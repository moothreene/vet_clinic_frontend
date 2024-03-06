import React from 'react'
import { Link } from 'react-router-dom'
import './User.css'

function User({_id, email}) {
  return (
    <div className='user_link'>
      <Link to={`/users/${_id}`}>{email}</Link>
    </div>
  )
}

export default User
