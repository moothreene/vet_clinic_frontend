import React, { useState } from 'react'
import Editor from '../components/Editor'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios';

function AddManipulation() {
    const {petId} = useParams();
    const [date,setDate] = useState(new Date());
    const [weight,setWeight] = useState(0);
    const [temp,setTemp] = useState(0);
    const [purpose,setPurpose] = useState("");
    const [desc, setDesc] = useState("");
    const [recommendation,setRecommendation] = useState("");
    const [redirect,setRedirect] = useState(false);

    async function HandleSubmit(event){
        event.preventDefault();
        const data = {date,petId, weight, temp, purpose, desc, recommendation}
        axios.post("http://localhost:5000/addManipulation",data,{withCredentials:true})
    }

    return (
        <div className='manipulation'>
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

export default AddManipulation
