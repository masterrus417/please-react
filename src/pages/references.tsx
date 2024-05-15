import React, { useState } from 'react';
import History from '../components/gtompel/History';
import Button from '@mui/material/Button';
import HistoryIcon from '@mui/icons-material/History';
const App: React.FC = () => {
  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent(!showComponent);
  };

  return (
    <div>
      <Button variant="contained" color="primary" size="small" startIcon={<HistoryIcon/>} onClick={handleClick}></Button>
      {showComponent && <History entityId={0} />}
    </div>
  );
};

export default App;
/*const References:React.FC = () => {


    return(
        <>Тут справочники</>
    )
}

export default References;*/