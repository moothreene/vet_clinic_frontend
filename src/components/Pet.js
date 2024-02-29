import React from 'react'
import { Link } from 'react-router-dom';

function Pet({_id,name,sex,weight,birthday,species,breed}) {
  const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
  return (
    <>
        <br />
        <Link to={_id}>{name}</Link>
        <div>{species}</div>
        <div>{sex}</div>
        <div>{breed}</div>
        <div>{getAge(birthday)} y.o.</div>
        <div>{weight/1000} kg</div>
    </>
  )
}

export default Pet
