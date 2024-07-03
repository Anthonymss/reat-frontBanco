import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Snackbar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import styled from '@emotion/styled';
import './Login.css'; // Importa tu archivo CSS
import { Link } from 'react-router-dom';

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  background-color: #f5f5f5;
`;

const StyledFormContainer = styled.div`
  text-align: center;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const StyledIconBox = styled(Box)`
  margin: auto;
  margin-bottom: 1rem;
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openError, setOpenError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      let requestBody = {};
      if (username.length === 8 && /^\d+$/.test(username)) {
        // If username is 8 digits and only numbers, treat it as DNI
        requestBody = {
          dni: username,
          password: password,
        };
      } else {
        // Otherwise, treat it as numeroCuenta
        requestBody = {
          numeroCuenta: username,
          password: password,
        };
      }

      const response = await fetch('banco1/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json(); // Assume backend returns JSON with user information
      console.log('Login successful:', data);

      // Simulating storing a session token in localStorage
      localStorage.setItem('token', 'dummyToken');

      // Store active user in localStorage
      localStorage.setItem('activeUser', JSON.stringify(data));

      // Redirect user based on authentication state
      if (localStorage.getItem('token')) {
        // If authenticated, redirect to dashboard
        navigate('/dashboard');
        window.location.reload();
      } else {
        // If not authenticated, show error message or take other action
        setError('Credenciales incorrectas. Por favor, verifica tu número de cuenta o DNI y contraseña.');
        setOpenError(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Credenciales incorrectas. Por favor, verifica tu número de cuenta o DNI y contraseña.');
      setOpenError(true);
    }
  };


  const handleForgotPassword = () => {
    alert('Se enviará un correo electrónico para recuperar la contraseña.');
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  return (
    <StyledContainer>
      <StyledFormContainer>
        <StyledIconBox>
          <LockOutlinedIcon fontSize="large" color="primary" />
        </StyledIconBox>
        <Typography variant="h5" gutterBottom>
          Iniciar Sesión
        </Typography>
        <TextField
          label="Número de Cuenta"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: (
              <Box mr={1}>
                <MailOutlineIcon color="action" />
              </Box>
            ),
          }}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <Box mr={1}>
                <LockOutlinedIcon color="action" />
              </Box>
            ),
          }}
        />
        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth sx={{ mb: 2 }}>
          Iniciar Sesión
        </Button>

        <Button color="primary" component={Link} to="/create" fullWidth sx={{ mr: 1 }}>
          Crear Cuenta Nueva
        </Button>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={openError}
          autoHideDuration={6000}
          onClose={handleCloseError}
          message={error}
          key={'bottomcenter'}
        />
      </StyledFormContainer>
    </StyledContainer>
  );
};

export default Login;
