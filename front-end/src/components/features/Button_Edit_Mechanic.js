import {useState} from 'react'
import Edit_Mechanic from './Edit_Mechanic'

export default function Button_Edit_Mechanic() {
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <div>
      <button className="add_button" onClick={handleClick}>Edit a mechanic</button>



      {/* 👇️ show component on click */}
      {isShown && <Box />}
    </div>
  );
}

function Box() {
  return (
    <div>
    <Edit_Mechanic/>
    </div>
  );
}