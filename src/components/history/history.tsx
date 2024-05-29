import React, {useState, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import {Box} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import {List, ListItem, ListItemText, Typography} from '@mui/material';
import {useLocation} from "react-router-dom";


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

const HistoryList: React.FC = ({}) => {
    const [history, setHistory] = useState<HistoryEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { state } = useLocation();
    const entityID = state?.id;

    // Функция для получения истории изменений с API
    const fetchHistory = async () => {
        try {
            setLoading(true);
            const response = await axios.get<HistoryResponse>(`http://92.53.119.132:80/api/v1/history/${entityID}`); // 53 - id сущности
            setHistory(response.data.history);
        } catch (err) {
            setError('Ошибка при получении истории изменений: +' + err);
        } finally {
            setLoading(false);
        }
    };

    // Вызов fetchHistory при монтировании компонента
    useEffect(() => {
        fetchHistory();
    }, [entityID]);

    if (loading)
        return (
            <Box sx={{display: 'flex'}}>{loading}
                <CircularProgress
                    color="primary"
                    size="lg"
                    value={50}/>
            </Box>);
    if (error)
        return (
            <Box sx={{display: 'flex'}}>
                <ErrorIcon/>{error}</Box>);


    return (
        <Box
            sx={{width: '100%', bgcolor: 'background.paper'}}>
            <Typography
                fontWeight={"bold"}
                sx={{paddingLeft: "8px"}}
                variant='h5'
                gutterBottom={true}>
                История изменений по сущности {entityID}:
            </Typography>
            <List
                sx={{width: '100%', bgcolor: 'background.paper'}}>
                {history.map((event, index) => (
                    <ListItem key={index} divider>
                        <ListItemText
                            primary={`${event.event_type_name}: ${event.event_description}`}
                            secondary={`Дата: ${event.event_date}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default HistoryList;