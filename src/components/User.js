import React from 'react'
import { Link } from 'react-router-dom'

function User({_id, email}) {
  return (
    <div>
      <Link to={`/users/${_id}`}>{email}</Link>
    </div>
  )
}

export default User
