import React, { useState } from 'react';
import History from './History';
import Button from '@mui/material/Button';
import HistoryIcon from '@mui/icons-material/History';


const App: React.FC = () => {
  const [showComponent, setShowComponent] = useState(false);
  const [entityId, setEntityId] = useState(0);

  const handleClick = async() => {
    setEntityId(entityId);
    setShowComponent(!showComponent);

  };
  return (
    <div>
      <input type="number" value={entityId} onChange={(e) => setEntityId(Number(e.target.value))} />
      <Button variant="contained" color="primary" size="small" startIcon={<HistoryIcon/>} onClick={handleClick}></Button>
      {showComponent && <History entityId={entityId} />}
    </div>
  );
};

export default App;
