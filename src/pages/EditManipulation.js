import React, { useEffect, useState } from 'react'
import Editor from '../components/Editor'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function EditManipulation() {
    const dateToday = new Date();
    const dateText =dateToday.getFullYear()+"-"
                +("0" + (dateToday.getMonth() + 1)).slice(-2) + "-" 
                +("0" + dateToday.getDate()).slice(-2);
    const {manipulationId} = useParams();
    const {petId} = useParams();
    const [date,setDate] = useState({dateText});
    const [weight,setWeight] = useState(0);
    const [temp,setTemp] = useState(0);
    const [purpose,setPurpose] = useState("");
    const [desc, setDesc] = useState("");
    const [recommendation,setRecommendation] = useState("");
    const [redirect,setRedirect] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:5000/manipulation/${manipulationId}`,{withCredentials:true}).then(
          response=>{
            if(response.data?.date) setDate(response.data.date)
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

    if(redirect) return navigate(-1);
    return (
        <div className='manipulation'>
            <button onClick={HandleDelete}>Delete</button>
            <form className="manipulationForm" onSubmit={HandleSubmit}>
                <input type="date" required value={date} onChange={e=>setDate(e.target.value)}></input>
                <br />
                <label>Weight</label>
                <br />
                <input placeholder="Weight" type="number" value={weight} onChange={e=>setWeight(e.target.value)}></input>
                <br />
                <label>Temperature</label>
                <br />
                <input placeholder="Temperature" type="number" value={temp} onChange={e=>setTemp(e.target.value)}></input>
                <br />
                <label>Purpose</label>
                <br />
                <input placeholder="Purpose" type="text" required value={purpose} onChange={e=>setPurpose(e.target.value)}></input>
                <br />
                <label>Description</label>
                <br />
                <Editor value={desc} onChange={setDesc}/>
                <br />
                <label>Recommendation</label>
                <br />
                <Editor value={recommendation} onChange={setRecommendation}/>
                <button type="submit">Submit</button>
            </form>        
        </div>
    )
}

export default EditManipulation
