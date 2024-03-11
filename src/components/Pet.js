import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import './Pet.css';

function Pet({_id,name,sex,weight,birthday,species,breed}) {
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
}
  function getEmoji(animal){
    switch(animal){
      case "Cat": return "🐱";
      case "Dog": return "🐶";
      case "Rodent": return"🐰";
      case "Bird": return "🐦";
      case "Exotic": return "🐲";
      default: return "🐾";
    }
  }
  return (
    <tr className='pet_preview'>
        <td><Link to={_id}>{name}</Link></td>
        <td className='emoji'><Link to={_id}>{getEmoji(species)}</Link> </td>
        <td><Link to={_id}>{sex}</Link> </td>
        <td><Link to={_id}>{breed}</Link> </td>
        <td><Link to={_id}>{getAge(birthday)}o.</Link> </td>
        <td><Link to={_id}>{weight/1000} kg</Link> </td>
    </tr>
  )
}

export default Pet
