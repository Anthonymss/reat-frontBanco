import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isActiveUser, setIsActiveUser] = useState<boolean>(false); // Estado para indicar si hay un usuario activo

  useEffect(() => {
    // Verificar y actualizar isActiveUser al cargar el componente
    const token = localStorage.getItem('token');
    setIsActiveUser(token ? true : false);
  }, []); // El array vacío [] asegura que este efecto solo se ejecute una vez al cargar el componente

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token de sesión
    setIsActiveUser(false); // Actualiza el estado local
    window.location.href = '/login'; // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar sx={{
          backgroundColor: '', // Color de fondo negro
          color: '#fff', // Color del texto blanco (opcional)
        }}>
        <Typography variant="h6" component="div" >

          BANCO 1
        </Typography>

        <Button color="inherit" startIcon={<HomeIcon />} component={Link} to="/" sx={{ mr: 1 }}>
          Home
        </Button>

        {isActiveUser ? (
          <>
            <Button color="inherit" startIcon={<PersonIcon />} component={Link} to="/profile" sx={{ mr: 1 }}>
              Profile
            </Button>
            <Button color="inherit" startIcon={<MonetizationOnIcon />} component={Link} to="/transactions" sx={{ mr: 1 }}>
              Transacciones
            </Button>

            <Button color="inherit" startIcon={<MonetizationOnIcon />} component={Link} to="/transactionsE" sx={{ mr: 1 }}>
              T. Interbancario
            </Button>

            <Button color="inherit" startIcon={<AccountBalanceIcon />} component={Link} to="/accounts" sx={{ mr: 1 }}>
              Cuentas
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </>
        ) : (
          <Button color="inherit" startIcon={<PersonIcon />} component={Link} to="/login">
            Login
          </Button>
        )}

        <div className="search">
          <div className="searchIcon">
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Buscar..."
            classes={{
              root: 'inputRoot',
              input: 'inputInput',
            }}
            inputProps={{ 'aria-label': 'search' }}
            sx={{ ml: 1 }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
