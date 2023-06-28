import React, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

function Filter_Revenue() {

    let [search, setSearch] = useState('');
    let[carType,setCarType] = useState([])
	    useEffect(() => {
	        getCarType()

	    }, [])

	       let getCarType = async () => {
	       let response = await fetch('/first_app/carTypes/filter/revenue/'+search)
	       let data = await response.json()
	       console.log('DATA:',data)
	       setCarType(data)
	    }


  // const sortName = () => {
  //   setContacts(
  //     data.sort((a, b) => {
  //       return a.first_name.toLowerCase() < a.first_name.toLowerCase()
  //         ? -1
  //         : a.first_name.toLowerCase() > a.first_name.toLowerCase()
  //         ? 1
  //         : 0;
  //     })
  //   );
  // };
  return (
    <div>

          <InputGroup style={{'width': '15%'}}>

            <Form.Control

              onChange={(e) => setSearch(e.target.value)}
              placeholder='write number '

            />
          </InputGroup>
           <button className="filter_button" onClick={getCarType}>start</button>


       <p>{search}</p>
		<div className="notes">
		{search  &&
		<table>
			<tr>
				<th>id</th>
				<th>name</th>
				<th>revenue</th>
				<th>nationality</th>
				<th>year</th>
			</tr>

			{carType.map((carType, index) =>
			(
	<tr>

			<td>{carType.id}</td>
			<td>
			{carType.name}</td>
			<td>{carType.revenue}</td>
			<td>{carType.nationality}</td>
			<td>{carType.year}</td>

	</tr>
		))
}
		</table>
		
		}
		
		</div>
		    
       
          
    </div>
  );
}

export default Filter_Revenue;