import React from 'react'

function Pet({name,sex,weight,birthday,species,breed}) {
  const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
  console.log(typeof(birthday))
  return (
    <>
        <br />
        <div>{name}</div>
        <div>{species}</div>
        <div>{sex}</div>
        <div>{breed}</div>
        <div>{getAge(birthday)} y.o.</div>
        <div>{weight/1000} kg</div>
    </>
  )
}

export default Pet
