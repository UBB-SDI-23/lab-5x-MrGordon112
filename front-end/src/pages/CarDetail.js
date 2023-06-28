import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';

import Button_Edit_Car from '../components/features/Button_Edit_Car'
import  {
  useParams
} from 'react-router-dom'


const DetailCar = ({match})  => {
    
    const { id } = useParams();
    let carId = id
    let [car,setCar]=useState(null)
    
    useEffect(()=>{
        getCar()
    }, [carId] )
    
    let getCar = async()=>{ 
        let response =await fetch('/first_app/cars/'+ carId)
        let data = await response.json()
        setCar(data)        
        }
    let navigate = useNavigate();


       const Delete = async () => {
		var result = window.confirm("Want to delete?");
        if (result) {
    //Logic to delete the item

        fetch('/first_app/cars/'+carId,{method:"DELETE"})
        .then((response)=>{
            if(!response.ok){
                throw new Error('not deleted')
            }
            navigate('/');
        }
        ).catch((e)=>{console.log(e)});
    }}

	return (
		<div>
		<ul id="list-item">
    		<li>id :{car?.id}</li>
    		<li>name :{car?.name}</li>
    		<li>price :{car?.price}$</li>
    		<li>year :{car?.year}</li>
    		<li>carType: {car?.carType}</li>
    		<li>description: {car?.description}</li>
		</ul>
		

     <button className="delete" onClick={Delete}>Delete</button>
    <Button_Edit_Car/>
		</div>
		)
};

export default DetailCar