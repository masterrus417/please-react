import React from 'react';
import { observer } from 'mobx-react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import historyStore from '../gtompel/HistoryStore';


interface HistoryListProps {
  entityId: number;
}

const HistoryList: React.FC<HistoryListProps> = observer(({ entityId }) => {
  const { history, loading, error } = historyStore;

  React.useEffect(() => {
    historyStore.fetchHistory(entityId);
  }, [entityId]);

  if (loading) return
  <Box sx={{ display: 'flex' }}>{loading}
  <CircularProgress />
  </Box>;
  if (error) return <Box sx={{ display: 'flex' }}>
  <ErrorIcon />{error}</Box>;

  return (
    <div>
      <h3>История изменений:</h3>
      <ul>
        {history.map((event, index) => (
          <li key={index}>
            {`${event.event_type_name}: ${event.event_description} (Дата: ${event.event_date}): ${event.event_user}: ${event.event_type}`}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default HistoryList;
