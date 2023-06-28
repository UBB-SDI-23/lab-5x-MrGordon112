import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import Button_Edit_CarType from '../components/features/Button_Edit_CarType'
import  {
  useParams
} from 'react-router-dom'


const CarTypeDetail = ({match})  => {
    
    const { id } = useParams()
    let carTypeId = id
    let [carType,setCarType]=useState(null)

    useEffect(()=>{
        getCarType()
    }, [carTypeId] )

    let getCarType = async()=>{
        let response =await fetch('/first_app/carTypes/'+ carTypeId)
        let data = await response.json()
        setCarType(data)
        }

     let navigate = useNavigate();

        const Delete = async () => {
		var result = window.confirm("Want to delete?");
        if (result){
        fetch('/first_app/carTypes/'+carTypeId,{method:"DELETE"})
        .then((response)=>{
            if(!response.ok){
                throw new Error('not deleted')
            }
            navigate('/carTypes');
        }
        ).catch((e)=>{console.log(e)});
    }}


	return (
		
				<div>
		<ul id="list-item">
    		<li>id :{carType?.id}</li>
    		<li>name :{carType?.name}</li>
    		<li>revenue :{carType?.revenue} $   </li>
    		<li>nationality :{carType?.nationality}</li>
    		<li>year: {carType?.year}</li>
    		<li>description: {carType?.description}</li>
		</ul>

    <button className="delete" onClick={Delete}>Delete</button>
    <Button_Edit_CarType/>
		</div>
		)
};

export default CarTypeDetail