import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import  {
  useParams
} from 'react-router-dom'
import Button_Edit_Repaired from '../components/features/Button_Edit_Repaired'

const RepairedDetail = ({match})  => {
    
    const { id } = useParams()
    let repairedId = id
    let [repaired,setRepaired]=useState(null)
    
    useEffect(()=>{
        getRepaired()
    }, [repairedId] )
    
    let getRepaired = async()=>{ 
        let response =await fetch('/first_app/repaireds/'+ repairedId)
        let data = await response.json()
        setRepaired(data)        
        }
        let navigate = useNavigate();

     const Delete = async () => {
		var result = window.confirm("Want to delete?");
        if (result) {fetch('/first_app/repaireds/'+repairedId,{method:"DELETE"})
        .then((response)=>{
            if(!response.ok){
                throw new Error('not deleted')
            }
            navigate('/repaireds');
        }
        ).catch((e)=>{console.log(e)});
    }}

	return (
		<div>
		
		<p>id:{repaired?.id}</p>

		<p>car id:{repaired?.car}</p>
		<p>mechanic id:{repaired?.mechanic}</p>


		<p>price:{repaired?.price}$</p>
		<p>date:{repaired?.date_created}</p>
		
		<p>price:{repaired?.price}$</p>
		
		<button className="delete" onClick={Delete}>Delete</button>
        <Button_Edit_Repaired />
		</div>
		)
};

export default RepairedDetail