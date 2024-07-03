import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { AccountBalance, Send, AccountCircle } from '@mui/icons-material';
import './Home.css';

const Home: React.FC = () => {
  return (
    <Container className="home-container">
      <Typography variant="h4" component="h2" gutterBottom className="fade-in">
        Bienvenido al Sistema Bancario Distribuido
      </Typography>
      <Typography variant="body1" className="fade-in" style={{ animationDelay: '0.5s' }}>
        Realiza transacciones entre cuentas de diferentes bancos de manera sencilla y rápida.
      </Typography>
      <Box className="icon-container fade-in" style={{ animationDelay: '1s' }}>
        <AccountBalance fontSize="large" color="primary" />
        <Send fontSize="large" color="secondary" />
        <AccountCircle fontSize="large" color="action" />
      </Box>
    </Container>
  );
};

export default Home;
