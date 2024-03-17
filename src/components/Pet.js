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
  function getPicture(animal){
    switch(animal){
      case "Cat": return (
        <>
          <img className="img_pet" src={require(`../images/cat.png`)} alt="addpet"/>
          <img className="img_pet_reverse" src={require(`../images/cat_reverse.png`)} alt="addpet"/>
        </>
      )
      case "Dog": return (
        <>
          <img className="img_pet" src={require(`../images/dog.png`)} alt="addpet"/>
          <img className="img_pet_reverse" src={require(`../images/dog_reverse.png`)} alt="addpet"/>
        </>
      );
      case "Rodent": return (
        <>
          <img className="img_pet" src={require(`../images/hamster.png`)} alt="addpet"/>
          <img className="img_pet_reverse" src={require(`../images/hamster_reverse.png`)} alt="addpet"/>
        </>
      );
      case "Bird": return (
        <>
          <img className="img_pet" src={require(`../images/parrot.png`)} alt="addpet"/>
          <img className="img_pet_reverse" src={require(`../images/parrot_reverse.png`)} alt="addpet"/>
        </>
      );
      case "Exotic": return (
        <>
          <img className="img_pet" src={require(`../images/exotic.png`)} alt="addpet"/>
          <img className="img_pet_reverse" src={require(`../images/exotic_reverse.png`)} alt="addpet"/>
        </>
      );
      default: return (
        <>
          <img className="img_pet" src={require(`../images/pet_default.png`)} alt="addpet"/>
          <img className="img_pet_reverse" src={require(`../images/pet_default_reverse.png`)} alt="addpet"/>
        </>
      );;
    }
  }
  return (
    <tr className='pet_preview'>
        <td><Link to={_id}>{name}</Link></td>
        <td className='emoji'><Link to={_id}>{getPicture(species)}</Link> </td>
        <td><Link to={_id}>{sex}</Link> </td>
        <td><Link to={_id}>{breed}</Link> </td>
        <td className='age'><Link to={_id}>{getAge(birthday)}o.</Link> </td>
        <td className='weight'><Link to={_id}>{weight/1000} kg</Link> </td>
    </tr>
  )
}

export default Pet
