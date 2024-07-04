import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Grid, MenuItem, Snackbar, Alert, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Modal, Backdrop, Fade } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface Transaction {
  id: number;
  tipo: string;
  monto: number;
  fecha: string;
  cuentaOrigenNumero: string;
  cuentaDestinoNumero: string;
  origenBanco: string;
  destinoBanco: string;
}

const Transactions: React.FC = () => {
  const activeUser = JSON.parse(localStorage.getItem('activeUser') || '{}');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('');
  const [notification, setNotification] = useState<{ message: string; severity: 'success' | 'error' | 'info' } | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    // Cargar historial de transacciones al montar el componente
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`https://banco1-bcp.onrender.com/transacciones/datos/${activeUser.numeroCuenta}`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error al obtener transacciones:', error);
      setNotification({ message: 'Error al cargar transacciones. Por favor, inténtalo nuevamente.', severity: 'error' });
    }
  };

  const handleTransaction = async () => {
    try {
      let response;

      if (transactionType === 'TRANSFERENCIA') {
        response = await axios.post('https://banco1-bcp.onrender.com/transacciones/operacion', {
          tipo: transactionType,
          monto: parseFloat(amount.toFixed(2)),
          cuentaOrigenNumero: activeUser.numeroCuenta || '',
          cuentaDestinoNumero: accountNumber
        });
      } else if (transactionType === 'DEPOSITO' || transactionType === 'RETIRO') {
        response = await axios.post('https://banco1-bcp.onrender.com/transacciones/operacion', {
          tipo: transactionType,
          monto: parseFloat(amount.toFixed(2)),
          cuentaOrigenNumero: activeUser.numeroCuenta || '',
          cuentaDestinoNumero: activeUser.numeroCuenta || ''
        });
      } else {
        throw new Error('Tipo de transacción no válido');
      }

      console.log('Transacción exitosa:', response.data);
      setNotification({ message: 'Movimiento exitoso!', severity: 'success' });
      fetchTransactions(); // Actualizar lista de transacciones después de una nueva transacción
    } catch (error) {
      console.error('Error en la transacción:', error);
      setNotification({ message: 'Error en la transacción. Por favor, verifica los datos ingresados.', severity: 'error' });
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleOpenModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container>
      <br></br>
      <Typography variant="h4" gutterBottom>
        Transacciones
      </Typography>
      <Box component="form" sx={{ mt: 3 }} noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              id="transaction-type"
              label="Tipo de Transacción"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <MenuItem value="DEPOSITO">Depósito</MenuItem>
              <MenuItem value="RETIRO">Retiro</MenuItem>
              <MenuItem value="TRANSFERENCIA">Transferencia</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id="amount"
              label="Monto"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            {transactionType === "TRANSFERENCIA" && (
              <TextField
                required
                fullWidth
                id="account-number"
                label="Número de Cuenta Destino"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            )}
          </Grid>


        </Grid>

        <Button
          type="button"
          variant="contained"
          color="primary"
          startIcon={<SendIcon />}
          sx={{ mt: 3, mb: 2 }}
          onClick={handleTransaction}
        >
          Realizar Transacción
        </Button>
      </Box>
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

      {/* Modal para detalles de transacción */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="transaction-modal-title"
        aria-describedby="transaction-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            maxWidth: 600,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}>
            <Typography variant="h5" id="transaction-modal-title" gutterBottom>
              Detalles de Transacción
            </Typography>
            {selectedTransaction && (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  ID: {selectedTransaction.id}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Tipo: {selectedTransaction.tipo}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Monto: {selectedTransaction.monto}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Fecha: {selectedTransaction.fecha}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Cuenta Origen: {selectedTransaction.cuentaOrigenNumero}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Cuenta Destino: {selectedTransaction.cuentaDestinoNumero}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Origen Banco: {selectedTransaction.origenBanco}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Destino Banco: {selectedTransaction.destinoBanco}
                </Typography>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>

      {/* Tabla de transacciones */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Historial de Transacciones
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.tipo}</TableCell>
                  <TableCell>{transaction.monto}</TableCell>
                  <TableCell>{new Date(transaction.fecha).toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenModal(transaction)} aria-label="ver-detalles">
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Transactions;
