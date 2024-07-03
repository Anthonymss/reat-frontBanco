import React from 'react';
import { Container, Typography, Box, Card, CardContent, Grid } from '@mui/material';

const Dashboard: React.FC = () => {
  // Obtener el usuario activo desde localStorage
  const activeUser = localStorage.getItem('activeUser');

  return (
    <Container>
      <br />
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Resumen de Cuentas
                </Typography>
                <Typography variant="body2">
                  Información sobre las cuentas del usuario.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Últimas Transacciones
                </Typography>
                <Typography variant="body2">
                  Detalles de las últimas transacciones.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Notificaciones
                </Typography>
                <Typography variant="body2">
                  Mensajes y alertas importantes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
