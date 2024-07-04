import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, CircularProgress, Button, Modal, TextField, Snackbar } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const Accounts: React.FC = () => {
  const [account, setAccount] = useState<{ numeroCuenta: string; saldo: string; id: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newAccount, setNewAccount] = useState({ numeroCuenta: '', saldo: '0', clienteId: '', bancoId: '1', password: '' });
  const [error, setError] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const activeUser = JSON.parse(localStorage.getItem('activeUser') || '{}');
  const numeroCuentaUsuario = activeUser.numeroCuenta;

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await fetch(`https://banco1-bcp.onrender.com/cuentas/${numeroCuentaUsuario}`);
        if (!response.ok) {
          throw new Error('Error fetching account');
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setAccount(data);
        } else {
          throw new Error('Response is not valid JSON');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [numeroCuentaUsuario]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateAccount = async () => {
    try {
      const response = await fetch('https://banco1-bcp.onrender.com/Register/crearCuenta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numeroCuenta: newAccount.numeroCuenta,
          saldo: parseFloat(newAccount.saldo),
          clienteId: parseInt(newAccount.clienteId),
          bancoId: parseInt(newAccount.bancoId),
          password: newAccount.password
        }),
      });

      if (!response.ok) {
        throw new Error('Error creating account. Please try again.');
      }

      const data = await response.json();
      console.log('Account created:', data);
      setOpenSuccess(true);
      handleCloseModal();
    } catch (error) {
      console.error('Error:', error);
      setError('Error creating account. Please try again.');
      setOpenError(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <br />
      <Typography variant="h4" gutterBottom>
        Cuenta
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ mb: 2 }}>
        Crear Cuenta Nueva
      </Button>
      <Box sx={{ flexGrow: 1 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {account && (
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ borderLeft: `6px solid #2196f3`, height: '100%' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center">
                        <AccountBalanceIcon fontSize="large" sx={{ color: '#2196f3', mr: 1 }} />
                        <Typography variant="h6" component="div">
                          Cuenta: {account.numeroCuenta}
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        Saldo: ${account.saldo}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        )}
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 24 }}>
          <Typography variant="h6" gutterBottom>
            Crear Nueva Cuenta
          </Typography>
          <TextField
            label="Número de Cuenta"
            fullWidth
            margin="normal"
            name="numeroCuenta"
            value={newAccount.numeroCuenta}
            onChange={handleChange}
          />
          <TextField
            name="saldo"
            type="hidden"
            value={newAccount.saldo}
            onChange={handleChange}
          />
          <TextField
            label="Cliente ID"
            fullWidth
            margin="normal"
            name="clienteId"
            type="number"
            value={newAccount.clienteId}
            onChange={handleChange}
          />
          <TextField
            name="bancoId"
            type="hidden"
            value={newAccount.bancoId}
            onChange={handleChange}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            name="password"
            value={newAccount.password}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" onClick={handleCreateAccount} fullWidth sx={{ mt: 2 }}>
            Crear Cuenta
          </Button>
        </Box>
      </Modal>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
        message={error}
      />

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={openSuccess}
        autoHideDuration={6000}
        onClose={() => setOpenSuccess(false)}
        message="Cuenta creada exitosamente"
      />
    </Container>
  );
};

export default Accounts;
