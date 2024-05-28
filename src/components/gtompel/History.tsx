import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { List, ListItem, ListItemText, Typography } from '@mui/material';


// Определение типов для событий истории
interface HistoryEvent {
  event_type: string;
  event_type_name: string;
  event_description: string;
  event_date: string;
  event_user: string | null;
}

interface HistoryResponse {
  entity_id: number;
  history: HistoryEvent[];
}

// Пропсы для компонента HistoryList
interface HistoryListProps {
  entityId: number;
}

const HistoryList: React.FC<HistoryListProps> = ({ entityId }) => {
  const [history, setHistory] = useState<HistoryEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Функция для получения истории изменений с API
  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get<HistoryResponse>(`http://92.53.119.132:80/api/v1/history/${entityId}`); // 53 - id сущности
      setHistory(response.data.history);
    } catch (err) {
      setError('Ошибка при получении истории изменений: ' + err);
    } finally {
      setLoading(false);
    }
  };

  // Вызов fetchHistory при монтировании компонента
  useEffect(() => {
    fetchHistory();
  }, [entityId]);

  if (loading) return
  <Box sx={{ display: 'flex' }}>{loading}
  <CircularProgress />
  </Box>;
  if (error) return <Box sx={{ display: 'flex' }}>
  <ErrorIcon />{error}</Box>;


  return (
    <div>
      <Typography variant="h6" gutterBottom>
        История изменений:
      </Typography>
      <List>
        {history.map((event, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={`${event.event_type_name}: ${event.event_description}`}
              secondary={`Дата: ${event.event_date}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default HistoryList;