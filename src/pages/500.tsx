import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100%',
        backgroundColor: '#f4f4f4',
        textAlign: 'center',
    },
    heading: {
        fontSize: '6rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
    },
    subheading: {
        fontSize: '1.5rem',
        marginBottom: '2rem',
    },
    image: {
        width: '300px',
        marginBottom: '2rem',
    },
    button: {
        marginTop: '2rem',
    },
};

const InternalServerErrorPage: React.FC = () => {

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <Container sx={styles.root}>
            <Typography style={styles.heading} color="primary">
                500
            </Typography>
            <Typography style={styles.subheading} color="textSecondary">
                Упс! Что-то пошло не так.
            </Typography>
            <Box style={styles.image}>
                <img
                    src="https://media.giphy.com/media/3o6fJ9c8WCLD4Plumw/giphy.gif"
                    alt="Confused robot"
                    style={{ width: '100%' }}
                />
            </Box>
            <Typography variant="body1" color="textSecondary">
                Мы уже работаем над решением этой проблемы. Попробуйте обновить страницу.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleReload}
                style={styles.button}
            >
                Обновить
            </Button>
        </Container>
    );
};

export default InternalServerErrorPage;
