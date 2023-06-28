import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom"

import { confirmAlert } from 'react-confirm-alert';
import Button_Edit_Mechanic from '../components/features/Button_Edit_Mechanic'
import  {
  useParams
} from 'react-router-dom'

const MechanicDetail = ({match})  => {
    
    const { id } = useParams()
    let mechanicId = id
    let [mechanic,setMechanic]=useState(null)
    
    useEffect(()=>{
        getMechanic()
    }, [mechanicId] )
    
    let getMechanic = async()=>{ 
        let response =await fetch('/first_app/mechanics/'+ mechanicId)
        let data = await response.json()
        setMechanic(data)        
        }
       let navigate = useNavigate();

        const Delete = async () => {
		var result = window.confirm("Want to delete?");
        if (result) {fetch('/first_app/mechanics/'+mechanicId,{method:"DELETE"})
        .then((response)=>{
            if(!response.ok){
                throw new Error('not deleted')
            }
            navigate('/mechanics');
        }
        ).catch((e)=>{console.log(e)});
    }}


	return (
		
		
				<div>
		<ul id="list-item">
    		<li>id :{mechanic?.id}</li>
    		<li>name :{mechanic?.name}</li>
    		<li>experience :{mechanic?.experience}</li>
    		<li>price :{mechanic?.price}</li>
    		<li>age: {mechanic?.age}</li>
    		<li>description: {mechanic?.description}</li>
		</ul>

    <button className="delete" onClick={Delete}>Delete</button>
    <Button_Edit_Mechanic/>
		</div>
		)
};

export default MechanicDetail