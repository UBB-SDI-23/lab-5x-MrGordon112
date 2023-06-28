import React from 'react'
import {Link} from 'react-router-dom'

const ItemCarType = ({carType})  => {
	return (
	<tr>
			
			<td>{carType.id}</td>
			<td><Link to={'/carTypes/'+carType.id}>
			{carType.name}</Link></td>
			<td>{carType.revenue}$</td>
			<td>{carType.nationality}</td>
			<td>{carType.year}</td>
			
	</tr>
		)
};

export default ItemCarType