import { useState } from "react";
import axios from 'axios';
import  {
  useParams
} from 'react-router-dom'


export default function Edit_Mechanic({match}) {
const { id } = useParams();
    let carId = id
    let [car,setCar]=useState(null)


  const [inputs, setInputs] = useState({
    name:"",
    experience:"",
    price:"",
    age:0,
    description:""
  });


   const handleSubmit=async()=> {
        await axios.put('/first_app/mechanics/'+carId,inputs)
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
      <label>Enter mechanics name:
      <input
        type="text"
        name="name"
        onChange={(event) => setInputs({...inputs, name: event.target.value})}
      />
        </label>
        <label>Enter mechanic's experience:
      <input
        type="text"
        name="experience"
         onChange={(event) => setInputs({...inputs, experience: event.target.value})}
      />
      </label>
      <label>Enter mechanic's price:
      <input
        type="text"
        name="price"
        onChange={(event) => setInputs({...inputs, price: event.target.value})}
      />

      </label>
      <label>Enter mechanics age:
        <input
          type="number"
          name="age"
           onChange={(event) => setInputs({...inputs, age: event.target.value})}
        />

        </label>
         <div>

         <label>Details:

         <textarea type="text" id="subject"
         name="detail" placeholder="Write something.."
          onChange={(event) => setInputs({...inputs, description: event.target.value})}
          />
        </label>
        </div>
        <input type="submit" />
    </form>
  )
}


/*
Click F12 and navigate to the "Console view"
to see the result when you submit the form.
*/