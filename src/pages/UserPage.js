import React, { useEffect, useState } from 'react'
import Pet from '../components/Pet';
import axios from 'axios';
import { useParams, Navigate, Link} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { updateOwner, resetOwner} from '../redux';
import "./UserPage.css";
import { serverUrl } from '../Utils';

function UserPage() {
    const {id} = useParams();
    const usersData = useSelector(state=>state.user);
    const [petData, setPetData] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(resetOwner())
        if(usersData.user){
            axios.get(`${serverUrl}/users/${id}`,{withCredentials:true}).then(
            response=>{
                setPetData(response.data.petData)
                dispatch(updateOwner(response.data?.userData))
            }
        )
        }
    },[])

    if(usersData.user?.id===id || usersData.user?.isDoctor)
    return (
        <div className='userPage_container'>
            <div className='owner_container'>
                {usersData?.owner &&(
                    <table className='owner_table'>
                    <tr>
                        <td className='owner_prefix'>Name:</td>
                        <td className='owner_info'>{usersData.owner.firstName} {usersData.owner.lastName}</td>
                    </tr>
                    <tr>
                        <td className='owner_prefix'>Phone:</td>
                        <td className='owner_info'>{usersData.owner.phoneNumber}</td>
                    </tr>
                    <tr>
                        <td className='owner_prefix'>email:</td>
                        <td className='owner_info'>{usersData.owner.email}</td>
                    </tr>
                    <tr>
                        <td className='owner_prefix'>City:</td>
                        <td className='owner_info'>{usersData.owner.city}</td>
                    </tr>
                    <tr>
                        <td className='owner_prefix'>Street:</td>
                        <td className='owner_info'>{usersData.owner.street}</td>
                    </tr>
                    <tr>
                        <td className='owner_prefix'>Home/Apt:</td>
                        <td className='owner_info'>{usersData.owner.addressMisc}</td>
                    </tr>   
                    </table>
                )}
                {usersData.user?.isDoctor && (
                    <>
                    <Link className='edit_link' to={"update"} >
                        <img className="img_default" src={require(`../images/edit.png`)} alt="edit"/>
                        <img className="img_hover" src={require(`../images/edit_reverse.png`)} alt="edit"/>
                    </Link>
                    </>
                )}
            </div>
            <div className='pets_container'>
                <table className='pets_table'>
                <colgroup>
                    <col span="1" />
                    <col span="1" />
                    <col span="1" />
                    <col className='breed' span="1" />
                    <col span="1" />
                    <col span="1" />
                </colgroup>
                <tr className='pets_header'>
                    <th>Name</th>
                    <th>Species</th>
                    <th>Sex</th>
                    <th>Breed</th>
                    <th>Age</th>
                    <th>Weight</th>
                </tr>
                    {petData.map(pet=>{
                        return(
                            <Pet {...pet} key={pet._id} />
                        )
                    })}
                </table>
                {usersData.user?.isDoctor && (
                    <Link className="link_add" to={"addpet"}>
                        <img className="img_default" src={require(`../images/add.png`)} alt="addpet"/>
                        <img className="img_hover" src={require(`../images/add_reverse.png`)} alt="addpet"/>
                    </Link>
                )}
            </div>
        </div>
    )
    return <Navigate to="/"></Navigate>
}

export default UserPage
