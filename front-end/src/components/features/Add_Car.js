import { useState } from "react";
import axios from 'axios';
export default function Add_Car() {

  const [errorMessage, setErrorMessage] = useState("");
  const [inputs, setInputs] = useState({
    name:"",
    description:"",
    price:0,
    year:"",
    carType:0,
  });


   const handleSubmit=()=> {
        axios.post('/first_app/cars/',inputs)
        .then((response)=>{
            if(!response.ok){
                throw new Error('not added')
            }else{
            alert('added')}
        }
        ).catch((e)=>{setErrorMessage('not added')});
    }




  return (
    <form onSubmit={handleSubmit}
    >
      <label>Enter car name: no restrictions
      <input
        type="text"
        name="name"
        onChange={(event) => setInputs({...inputs, name: event.target.value})}
      />
        </label>
        <label>Enter year of fabrication: cannot be after present year
      <input
        type="number"
        name="year"
         onChange={(event) => setInputs({...inputs, year: event.target.value})}
      />
      </label>
      <label>Enter car's price:  needs to be positive
      <input
        type="number"
        name="price"
        onChange={(event) => setInputs({...inputs, price: event.target.value})}
      />

      </label>
      <label>Enter carType id: must exists
        <input
          type="number"
          name="carType"
           onChange={(event) => setInputs({...inputs, carType: event.target.value})}
        />

        </label>
         <div>

         <label>Details:  no restrictions

         <textarea type="text" id="subject"
         name="detail" placeholder="Write something.."
          onChange={(event) => setInputs({...inputs, description: event.target.value})}
          />
        </label>
        </div>
        <input type="submit" />
        {errorMessage && <div className="error"> {errorMessage} </div>}
    </form>
  )
}


/*
Click F12 and navigate to the "Console view"
to see the result when you submit the form.
*/