import React from 'react'
import {Link} from 'react-router-dom'

import { useNavigate } from "react-router-dom";
const ItemCar = ({car})  => {
	return (
	
		<tr>
			
			<td>{car.id}</td>
			<td><Link to={'/cars/'+car.id}>
			{car.name}</Link></td>
			<td>{car.price}$</td>
			<td>{car.year}</td>
			<td>{car.carType}</td>
			
	</tr>
		
		)
};

export default ItemCar
