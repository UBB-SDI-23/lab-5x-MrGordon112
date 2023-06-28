import {useState} from 'react';
import Filter_Revenue from './Filter'

export default function Button_Filter() {
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };

  return (
    <div>
      <button className="filter_button" onClick={handleClick}>Filter_by_Revenue</button>

    

      {/* 👇️ show component on click */}
      {isShown && <Box />}
    </div>
  );
}

function Box() {
  return (
    <div>
    	<h1>Firtered by revenue CarTypes</h1>
      <Filter_Revenue/>
    </div>
  );
}