import React from 'react';
import { Container, Typography, Box, TextField, Button, Avatar, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import BadgeIcon from '@mui/icons-material/Badge';

const Profile: React.FC = () => {
  const activeUser = JSON.parse(localStorage.getItem('activeUser') || '{}');

  const handleUpdateProfile = () => {
    // Lógica para actualizar el perfil
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Avatar sx={{ width: 100, height: 100, mb: 2, mx: 'auto' }}>
          <AccountCircleIcon sx={{ width: 64, height: 64 }} />
        </Avatar>
        <Typography variant="h4" align="center" gutterBottom>
          Perfil de {activeUser.nombre} 
        </Typography>
        <Box component="form" sx={{ mt: 3 }} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="numeroCuenta"
                label="Número de Cuenta"
                defaultValue={activeUser.numeroCuenta || ''}
                InputProps={{
                  startAdornment: <BadgeIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="nombre"
                label="Nombre"
                defaultValue={activeUser.nombre || ''}
                InputProps={{
                  startAdornment: <AccountCircleIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="apellido"
                label="Apellido"
                defaultValue={activeUser.apellido || ''}
                InputProps={{
                  startAdornment: <AccountCircleIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                defaultValue={activeUser.email || ''}
                InputProps={{
                  startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="telefono"
                label="Teléfono"
                defaultValue={activeUser.telefono || ''}
                InputProps={{
                  startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="dni"
                label="DNI"
                defaultValue={activeUser.dni || ''}
                InputProps={{
                  startAdornment: <VpnKeyIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            onClick={handleUpdateProfile}
          >
            Actualizar Perfil
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
