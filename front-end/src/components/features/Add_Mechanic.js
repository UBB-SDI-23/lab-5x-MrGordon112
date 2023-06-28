import { useState } from "react";
import axios from 'axios';
export default function Add_Mechanic() {
   const [errorMessage, setErrorMessage] = useState("");
  const [inputs, setInputs] = useState({
    name:"",
    experience:"",
    price:"",
    age:0,
    description:""
  });


   const handleSubmit=()=> {
        axios.post('/first_app/mechanics/',inputs)
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
      <label>Enter mechanics name: (no restriction)
      <input 
        type="text" 
        name="name"
        onChange={(event) => setInputs({...inputs, name: event.target.value})}
      />
        </label>
        <label>Enter mechanic's experience: (no restriction)
      <input
        type="text" 
        name="experience" 
         onChange={(event) => setInputs({...inputs, experience: event.target.value})}
      />   
      </label>
      <label>Enter mechanic's price: from $ to $$$$$
      <input 
        type="text" 
        name="price" 
        onChange={(event) => setInputs({...inputs, price: event.target.value})}
      />
       
      </label>
      <label>Enter mechanics age: between 16-110
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
        {errorMessage && <div className="error"> {errorMessage} </div>}
    </form>
  )
}


/*
Click F12 and navigate to the "Console view"
to see the result when you submit the form.
*/