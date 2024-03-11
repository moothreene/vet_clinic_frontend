import React from 'react'
import { Link } from 'react-router-dom';
import "./PetBrowse.css"

function PetBrowse({_id,owner_id,name,sex,weight,birthday,species,breed}) {
  const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
  return (
    <tr className="pet_link">
      <td><Link to={`/users/${owner_id._id}/${_id}`}>{name}</Link></td>
      <td><Link to={`/users/${owner_id._id}/${_id}`}>{species}</Link></td>
      <td><Link to={`/users/${owner_id._id}/${_id}`}>{sex}</Link></td>
      <td className='owner'><Link to={`/users/${owner_id._id}/${_id}`}>Owner: {owner_id.lastName} {owner_id.firstName}</Link></td>
    </tr>
  )
}

export default PetBrowse
