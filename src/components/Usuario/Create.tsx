import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Snackbar, Grid } from '@mui/material';
import { Person, Email, VpnKey, Fingerprint, Phone } from '@mui/icons-material';
import styled from '@emotion/styled';
import './Create.css'; // Asegúrate de que este archivo CSS está presente y definido correctamente

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
    if (nombre.trim().length === 0 || nombre.length > 50) {
      setError('El nombre no puede estar vacío y debe tener menos de 50 caracteres.');
      return false;
    }
    if (apellido.trim().length === 0 || apellido.length > 50) {
      setError('El apellido no puede estar vacío y debe tener menos de 50 caracteres.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 50) {
      setError('Por favor, ingresa un correo electrónico válido con un máximo de 50 caracteres.');
      return false;
    }
    if (!/^\d{8}$/.test(dni)) {
      setError('El DNI debe ser un número de 8 dígitos.');
      return false;
    }
    if (telefono.trim().length === 0 || telefono.length > 50) {
      setError('El teléfono no puede estar vacío y debe tener menos de 50 caracteres.');
      return false;
    }
    if (password.trim().length === 0) {
      setError('La contraseña no puede estar vacía.');
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
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión después del registro exitoso

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
              helperText={error && error.includes('nombre') && error}
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
              helperText={error && error.includes('apellido') && error}
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
              helperText={error && error.includes('correo electrónico') && error}
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
              helperText={error && error.includes('DNI') && error}
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
              helperText={error && error.includes('teléfono') && error}
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
              helperText={error && error.includes('contraseña') && error}
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
