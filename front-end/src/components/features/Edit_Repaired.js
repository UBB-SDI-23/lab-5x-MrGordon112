import { useState } from "react";
import axios from 'axios';
import  {
  useParams
} from 'react-router-dom'


export default function Edit_Repaired({match}) {
const { id } = useParams()
    let carId = id



  const [inputs, setInputs] = useState({
    car:0,
    mechanic:0,
    date_created:"",
    price:0,
  });


   const handleSubmit=async()=> {
        await axios.put('/first_app/repaireds/'+carId,inputs)
        .then((response)=>{
            if(!response.ok){
                throw new Error('not added')
            }
        }
        ).catch((e)=>{console.log(e)});
    }




  return (
    <form onSubmit={handleSubmit}
    >
      <label>Enter id car:
      <input
        type="number"
        name="car"
        onChange={(event) => setInputs({...inputs, car: event.target.value})}
      />
        </label>
        <label>Enter mechanic id:
      <input
        type="number"
        name="mechanic"
         onChange={(event) => setInputs({...inputs, mechanic: event.target.value})}
      />
      </label>
      <label>Enter date_created:
      <input
        type="text"
        name="date_created"
        onChange={(event) => setInputs({...inputs, date_created: event.target.value})}
      />

      </label>
      <label>Enter price:
        <input
          type="number"
          name="price"
           onChange={(event) => setInputs({...inputs, price: event.target.value})}
        />
        </label>

        <input type="submit" />
    </form>
  )
}


/*
Click F12 and navigate to the "Console view"
to see the result when you submit the form.
*/