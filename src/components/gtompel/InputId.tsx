import React, { useState } from 'react';
import History from './History';
import Button from '@mui/material/Button';
import HistoryIcon from '@mui/icons-material/History';
import { Box, Typography, Input,} from '@mui/material';





const App: React.FC = () => {
  const [showComponent, setShowComponent] = useState(false);
  const [entityId, setEntityId] = useState(0);

  const handleClick = async () => {
      setShowComponent(!showComponent);
  };



  return (
      <Box


          >
            <Typography fontWeight={"bold"} sx={{paddingLeft:"8px"}} variant='h5'>  Input Id :
            </Typography>

          <Input
              placeholder="entity id"
              type="number"
              value={entityId}
              onChange={(e) => setEntityId(Number(e.target.value))} // Преобразование в число
          />
          <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<HistoryIcon/>}
              onClick={handleClick}
          >

          </Button>
          {showComponent && <History entityId={entityId} />}
      </Box>

  );
};

export default App;