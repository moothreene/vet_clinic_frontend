import React from 'react'
import { Link } from 'react-router-dom';

function Pet({_id,name,sex,weight,birthday,species,breed}) {
  const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);
  function getAge(birthDate){
    const today = new Date();
    const birthDayDate = new Date(birthDate);
    let age = today.getFullYear() - birthDayDate.getFullYear();
    const monthDiff = today.getMonth() - birthDayDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDayDate.getDate())) {
        age--;
    }
    let result = "";
    if(age > 0){
        result += (age+" y.")
    }
    if(monthDiff<0){
        result+= ((result?" ":"")+(12+monthDiff) + " m.")
    }else if(monthDiff>0){
        result += ((result?" ":"")+monthDiff + " m. ")
    }
    return result;
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
        <td><Link to={_id}>{getAge(birthday)}o.</Link> </td>
  )
}

export default Pet
