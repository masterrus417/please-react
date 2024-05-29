
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Container, Box, Paper } from '@mui/material';
import bannerImage from '../assets/Job.png';


const Home: React.FC = () => {


  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Paper sx={{ padding: 2, marginBottom: 4 }}>
          <Typography variant="h4" gutterBottom>Добро пожаловать в наше приложение для подбора персонала!</Typography>
        </Paper>
        <img src={bannerImage} alt="Banner" style={{ maxWidth: '100%', marginBottom: '20px' }} />
        <Typography variant="body1" align="center" gutterBottom>Найдите лучших сотрудников для вашей компании быстро и эффективно.</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button component={Link} to="/candidate" variant="contained" color="primary" sx={{ marginRight: 1 }}>Поиск сотрудников</Button>
          <Button component={Link} to="/request" variant="outlined" color="primary" sx={{ marginLeft: 1 }}>Хочу смотреть заявки</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Home;