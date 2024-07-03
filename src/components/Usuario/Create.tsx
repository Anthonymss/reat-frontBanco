import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Snackbar, Grid } from '@mui/material';
import { Person, Email, VpnKey, AccountBox, Phone, Fingerprint } from '@mui/icons-material';
import styled from '@emotion/styled';
import './Create.css';

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
  max-width: 600px;
  width: 100%;
`;

const Create: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openError, setOpenError] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (nombre.length > 50) {
      setError('El nombre no puede tener más de 50 caracteres.');
      setOpenError(true);
      return false;
    }
    if (apellido.length > 50) {
      setError('El apellido no puede tener más de 50 caracteres.');
      setOpenError(true);
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 50) {
      setError('Por favor, ingresa un correo electrónico válido con un máximo de 50 caracteres.');
      setOpenError(true);
      return false;
    }
    if (!/^\d{8}$/.test(dni)) {
      setError('El DNI debe ser un número de 8 dígitos.');
      setOpenError(true);
      return false;
    }
    if (telefono.length > 50) {
      setError('El teléfono no puede tener más de 50 caracteres.');
      setOpenError(true);
      return false;
    }
    if (password.length === 0) {
      setError('La contraseña no puede estar vacía.');
      setOpenError(true);
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch('/banco1/Register/firstRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          dni,
          telefono,
          password,
          idBanco: 1, // idBanco automático
        }),
      });

      if (!response.ok) {
        throw new Error('Registro fallido');
      }

      const data = await response.text();
      console.log('Registro exitoso:', data);
      navigate('/login');
     

    } catch (error) {
      console.error('Error:', error);
      setError('Registro fallido. Por favor, verifica los datos ingresados.');
      setOpenError(true);
    }
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  return (
    <StyledContainer>
      <StyledFormContainer>
        <Typography variant="h5" gutterBottom>
          Crear Cuenta
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              fullWidth
              margin="normal"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Person color="action" />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              fullWidth
              margin="normal"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Person color="action" />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Correo Electrónico"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Email color="action" />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="DNI"
              fullWidth
              margin="normal"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Fingerprint color="action" />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono"
              fullWidth
              margin="normal"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Phone color="action" />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <VpnKey color="action" />
                ),
              }}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleRegister} fullWidth sx={{ mt: 2, mb: 2 }}>
          Crear Cuenta
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

export default Create;
