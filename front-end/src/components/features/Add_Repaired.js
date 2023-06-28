import { useState } from "react";
import axios from 'axios';
export default function Add_Repaired() {

  const [errorMessage, setErrorMessage] = useState("");
  const [inputs, setInputs] = useState({
    car:0,
    mechanic:0,
    date_created:"",
    price:0,
  });


   const handleSubmit=()=> {
        axios.post('/first_app/repaireds/',inputs)
        .then((response)=>{
            if(!response.ok){
                throw new Error('not added')
            }
        }
        ).catch((e)=>{setErrorMessage('not added')});
    }




  return (
    <form onSubmit={handleSubmit}
    >
      <label>Enter id car: must exist
      <input
        type="number"
        name="car"
        onChange={(event) => setInputs({...inputs, car: event.target.value})}
      />
        </label>
        <label>Enter mechanic id: must exist
      <input
        type="number"
        name="mechanic"
         onChange={(event) => setInputs({...inputs, mechanic: event.target.value})}
      />
      </label>
      <label>Enter date_created: not after the current day
      <input
        type="text"
        name="date_created"
        onChange={(event) => setInputs({...inputs, date_created: event.target.value})}
      />

      </label>
      <label>Enter price: positive
        <input
          type="number"
          name="price"
           onChange={(event) => setInputs({...inputs, price: event.target.value})}
        />
        </label>

        <input type="submit" />
        {errorMessage && <div className="error"> {errorMessage} </div>}
    </form>
  )
}


/*
Click F12 and navigate to the "Console view"
to see the result when you submit the form.
*/