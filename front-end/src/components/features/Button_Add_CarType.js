import {useState} from 'react'
import Add_CarType from './Add_CarType'

export default function Button_Add_CarType() {
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <div>
      <button className="add_button" onClick={handleClick}>Add a carType</button>



      {/* 👇️ show component on click */}
      {isShown && <Box />}
    </div>
  );
}

function Box() {
  return (
    <div>
    <Add_CarType/>
    </div>
  );
}