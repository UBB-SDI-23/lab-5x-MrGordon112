import {useState} from 'react'
import Add_Repaired from './Add_Repaired'

export default function Button_Add_Repaired() {
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <div>
      <button className="add_button" onClick={handleClick}>Add a repair</button>



      {/* 👇️ show component on click */}
      {isShown && <Box />}
    </div>
  );
}

function Box() {
  return (
    <div>
    <Add_Repaired/>
    </div>
  );
}