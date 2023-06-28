import React from 'react'
import {Link} from 'react-router-dom'

const ItemMechanic = ({mechanic})  => {
	return (
		
		<tr>
			
			<td>{mechanic.id}</td>
			<td><Link to={'/mechanics/'+mechanic.id}>
			{mechanic.name}</Link></td>
			<td>{mechanic.experience}</td>
			<td>{mechanic.price}</td>
			<td>{mechanic.age}</td>
			
	</tr>
		)
};

export default ItemMechanic