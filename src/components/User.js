import React from 'react'
import { Link } from 'react-router-dom'
import './User.css'

function User({_id, email, firstName, lastName}) {
  return (
    <tr className='user_link'>
        <td><Link to={`/users/${_id}`}>{lastName}</Link></td>
        <td><Link to={`/users/${_id}`}>{firstName}</Link></td>
    </tr>
  )
}

export default User
