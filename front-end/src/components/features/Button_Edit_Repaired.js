import {useState} from 'react'
import Edit_Repaired from './Edit_Repaired'

export default function Button_Edit_Repaired() {
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <div>
      <button className="add_button" onClick={handleClick}>Edit repaired</button>



      {/* 👇️ show component on click */}
      {isShown && <Box />}
    </div>
  );
}

function Box() {
  return (
    <div>
    <Edit_Repaired/>
    </div>
  );
}