import React, { useEffect, useState } from 'react'
import Editor from '../components/Editor'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function EditManipulation() {
    
    const {manipulationId} = useParams();
    const {petId} = useParams();
    const [date,setDate] = useState(`${dateText()}`);
    const [weight,setWeight] = useState(null);
    const [temp,setTemp] = useState(null);
    const [purpose,setPurpose] = useState("");
    const [desc, setDesc] = useState("");
    const [recommendation,setRecommendation] = useState("");
    const [redirect,setRedirect] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:5000/manipulation/${manipulationId}`,{withCredentials:true}).then(
          response=>{
            if(response.data?.date) setDate(dateText(response.data.date))
            if(response.data?.weight) setWeight(response.data.weight)
            if(response.data?.temp) setTemp(response.data.temp)
            if(response.data?.purpose) setPurpose(response.data.purpose)
            if(response.data?.desc) setDesc(response.data.desc)
            if(response.data?.recommendation) setRecommendation(response.data.recommendation)
          }
        )
      },[])

    async function HandleSubmit(event){
        event.preventDefault();
        const data = {manipulationId,date,petId, weight, temp, purpose, desc, recommendation}
        axios.put("http://localhost:5000/editManipulation",data,{withCredentials:true}).then(
            response=>{
                setRedirect(true);
            }
        )
    }

    async function HandleDelete(){
        axios.post("http://localhost:5000/deleteManipulation",{manipulationId},{withCredentials:true}).then(
            response=>{
                navigate(-2);
            }
        )
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

    if(redirect) return navigate(-1);
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
                    <button type="submit">Edit</button>
                    <button onClick={HandleDelete}>Delete</button>
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

export default EditManipulation
