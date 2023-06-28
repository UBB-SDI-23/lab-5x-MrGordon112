import React from 'react'
import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'


const ItemRepaired = ({repaired})  => {
	
    let [car,setCar]=useState("this is my state")
    
      useEffect(()=>{
        getCar()
    }, [repaired.car] )
    
     let getCar = async()=>{ 
	let response =await fetch('/first_app/cars/'+ repaired.car)
        let data = await response.json()
        setCar(data)  
     }
        
     let [mechanic,setMechanic]=useState("yes yes")
    
    useEffect(()=>{
        getMechanic()
    }, [repaired.mechanic] )
    
    let getMechanic = async()=>{ 
        let response =await fetch('/first_app/mechanics/'+ repaired.mechanic)
        let data = await response.json()
        setMechanic(data)        
        }
    
     
     
     
     
        
	return (
	
			<tr><td>
			<Link to={'/repaireds/'+ repaired.id}>
			
			{repaired.id}
			</Link></td>
			<td>{repaired.car}</td>

			<td>
				<Link to={'/cars/'+repaired.car}>
				{car.name}
				</Link>
			</td>
			
			<td>{repaired.mechanic}</td>
			
			<td>
				<Link to={'/mechanics/'+ repaired.mechanic}>
				{mechanic.name}
				</Link>
			</td>
			<td>{repaired.date_created}</td>
			<td>{repaired.price}$</td>
	</tr>
	
	
		)
};

export default ItemRepaired
