import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const response = await axios.get<HistoryResponse>(`http://92.53.119.132:80/api/v1/history/53`);
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

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;


  return (
    <div>
      <h3>История изменений:</h3>
      <ul>
        {history.map((event, index) => (
          <li key={index}>
            {`${event.event_type_name}: ${event.event_description} (Дата: ${event.event_date})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;



/*const References:React.FC = () => {


    return(
        <>Тут справочники</>
    )
}

export default References;*/