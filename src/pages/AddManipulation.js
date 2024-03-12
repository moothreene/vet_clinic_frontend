import React, { useState, useEffect } from 'react'
import Editor from '../components/Editor'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import './AddManipulation.css';
import { useSelector } from 'react-redux';
import { getAge } from '../Utils';

function AddManipulation() {
    const {petId} = useParams();
    const [date,setDate] = useState(`${dateText()}`);
    const [weight,setWeight] = useState(null);
    const [temp,setTemp] = useState(null);
    const [purpose,setPurpose] = useState("");
    const [desc, setDesc] = useState("");
    const [recommendation,setRecommendation] = useState("");
    const [petData,setPetData] = useState([]);
    const [redirect,setRedirect] = useState(false);
    const navigate = useNavigate();
    const userData = useSelector(state=>state.user);

    useEffect(()=>{
        if (userData.user){
            axios.get(`http://localhost:5000/pet/${petId}`,{withCredentials:true}).then(
            response=>{
                setPetData(response.data.petData);
            }
        )
        }
    },[]);

    async function HandleSubmit(event){
        event.preventDefault();
        const data = {date,petId, weight, temp, purpose, desc, recommendation}
        axios.post("http://localhost:5000/addManipulation",data,{withCredentials:true}).then(
            response=>{
                setRedirect(true);
            }
        )
    }

    function HandleInputSwitch(){
        const inputFields = document.getElementsByClassName("quill");
        const selectButtons = document.getElementsByClassName("select_button")
        for(let inputField of inputFields){
            inputField.classList.toggle("hidden")
        }
        for(let selectButton of selectButtons){
            selectButton.classList.toggle("disabled");
        }
    }

    function dateText(inputDate=new Date()){
        const dateToday = new Date(inputDate);
        const dateText =dateToday.getFullYear()+"-"
                +("0" + (dateToday.getMonth() + 1)).slice(-2) + "-" 
                +("0" + dateToday.getDate()).slice(-2)+" "
                +("0" + dateToday.getHours()).slice(-2)+":"
                +("0" + dateToday.getMinutes()).slice(-2);
        return dateText;
    }

    if(redirect) return navigate(-1)
    return (
        <div className='manipulation'>
            <form className="manipulationForm" onSubmit={HandleSubmit}>
                <div className='manipulation_short'>
                    <input type="datetime-local" required value={date} onChange={e=>{
                        setDate(e.target.value)}}>
                    </input>
                    <input placeholder="Weight" type="number" value={weight} onChange={e=>setWeight(e.target.value)}></input>
                    <input placeholder="Temperature" type="number" value={temp} onChange={e=>setTemp(e.target.value)}></input>
                    <input placeholder="Purpose" type="text" required value={purpose} onChange={e=>setPurpose(e.target.value)}></input>
                    <button type="submit">Submit</button>
                    <table className='pet_info_table'>
                        <tr>
                            <td className='pet_info_prefix'>Name:</td>
                            <td className='pet_info_value'>{petData.name}</td>
                        </tr>
                        <tr>
                            <td className='pet_info_prefix'>Age:</td>
                            <td className='pet_info_value'>{getAge(petData.birthday)}o.</td>
                        </tr>
                        <tr>
                            <td className='pet_info_prefix'>Sex:</td>
                            <td className='pet_info_value'>{petData.sex}</td>
                        </tr>
                        <tr>
                            <td className='pet_info_prefix'>Species:</td>
                            <td className='pet_info_value'><div>{petData.species}</div></td>
                        </tr>
                        <tr>
                            <td className='pet_info_prefix'>Breed:</td>
                            <td className='pet_info_value'><div>{petData.breed}</div></td>
                        </tr>
                    </table>  
                </div>
                <div className='manipulation_long'>
                    <fieldset className='field desc'>
                        <legend>
                            <button type="button" className='desc select_button disabled' onClick={HandleInputSwitch}>Description</button>
                            <button type="button" className='recommendation select_button' onClick={HandleInputSwitch}>Recommendation</button>
                        </legend>
                        <Editor value={desc} onChange={setDesc}/>
                        <Editor className="hidden" value={recommendation} onChange={setRecommendation}/>
                    </fieldset>
                </div>
            </form>        
        </div>
    )
}

export default AddManipulation
