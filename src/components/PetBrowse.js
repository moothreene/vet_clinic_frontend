import React from 'react'
import { Link } from 'react-router-dom';
import "./PetBrowse.css"

function PetBrowse({_id,owner_id,name,sex,weight,birthday,species,breed}) {
  const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
  return (
    <div className="pet_link">
        <Link to={`/users/${owner_id._id}/${_id}`}>
            {name} {species} {sex} Owner: {owner_id.lastName} {owner_id.firstName}
        </Link>
    </div>
  )
}

export default PetBrowse
