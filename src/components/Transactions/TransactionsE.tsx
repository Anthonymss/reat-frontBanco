import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Snackbar, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
import styled from '@emotion/styled';

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

const Transaction: React.FC = () => {
  const [amount, setAmount] = useState(0.00);
  const [destinationAccountNumber, setDestinationAccountNumber] = useState('');
  const [originBank, setOriginBank] = useState<string>('');
  const [destinationBank, setDestinationBank] = useState<string>('');
  const [error, setError] = useState('');
  const [openError, setOpenError] = useState(false);
  const [banks, setBanks] = useState<string[]>([]);
  const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'error' | 'info' } | null>(null);
  const activeUser = JSON.parse(localStorage.getItem('activeUser') || '{}');

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const response = await fetch('/banco1/microservicios');
      if (!response.ok) {
        throw new Error('Failed to fetch banks');
      }
      const data = await response.json();
      setBanks(data);
      if (data.length > 0) {
        setOriginBank(data[0]); // Establece el primer banco como predeterminado
        setDestinationBank(data[0]); // Establece el primer banco como predeterminado
      }
    } catch (error) {
      console.error('Error fetching banks:', error);
      setError('Error al cargar los bancos. Por favor, intenta nuevamente más tarde.');
      setOpenError(true);
    }
  };

  const handleTransaction = async () => {
    try {
      const response = await fetch(`/banco1/transacciones/operacionInterbancaria/${destinationBank}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipo: 'TRANSACCION_INTERBANCARIA',
          monto: parseFloat(amount.toFixed(2)),
          cuentaOrigenNumero: activeUser.numeroCuenta,
          cuentaDestinoNumero: destinationAccountNumber,
          origenBanco: originBank,
          destinoBanco: destinationBank,
        }),
      });

      if (!response.ok) {
        throw new Error('Transacción fallida');
      }

      setNotification({ message: 'Transacción exitosa!', severity: 'success' });
    } catch (error) {
      console.error('Error:', error);
      setNotification({ message: 'Error al realizar la transacción. Verifica los datos e intenta nuevamente.', severity: 'error' });
    } finally {
      setOpenError(true); // Mostrar éxito o manejar redirección según necesidad
    }
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <StyledContainer>
      <StyledFormContainer>
        <Typography variant="h5" gutterBottom>
          Transacción Interbancaria
        </Typography>
        <TextField
          label="Monto"
          fullWidth
          margin="normal"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <TextField
          label="Número de Cuenta Destino"
          fullWidth
          margin="normal"
          value={destinationAccountNumber}
          onChange={(e) => setDestinationAccountNumber(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="originBankLabel">Banco Origen</InputLabel>
          <Select
            labelId="originBankLabel"
            value={originBank}
            onChange={(e) => setOriginBank(e.target.value as string)}
          >
            {banks.map((bank, index) => (
              <MenuItem key={index} value={bank}>{bank}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="destinationBankLabel">Banco Destino</InputLabel>
          <Select
            labelId="destinationBankLabel"
            value={destinationBank}
            onChange={(e) => setDestinationBank(e.target.value as string)}
          >
            {banks.map((bank, index) => (
              <MenuItem key={index} value={bank}>{bank}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleTransaction} fullWidth sx={{ mt: 2, mb: 2 }}>
          Realizar Transacción
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

      <Snackbar
        open={!!notification}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification?.severity}
          sx={{ width: '100%' }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default Transaction;
