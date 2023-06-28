import {useState} from 'react'
import Add_Mechanic from './Add_Mechanic'

export default function Button_Add_Mechanic() {
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <div>
      <button className="add_button" onClick={handleClick}>Add a mechanic</button>



      {/* 👇️ show component on click */}
      {isShown && <Box />}
    </div>
  );
}

function Box() {
  return (
    <div>
    <Add_Mechanic/>
    </div>
  );
}