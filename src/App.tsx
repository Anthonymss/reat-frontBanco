import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar/Navbar"; 
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Transactions from "./components/Transactions/Transactions"; 
import TransactionsE from "./components/Transactions/TransactionsE";// Asegúrate de que esta importación sea correcta
import Accounts from "./components/Accounts/Accounts";
import Profile from "./components/Profile/Profile";
import Create from "./components/Usuario/Create";

import "./App.css";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} /> {/* Asegúrate de que Transactions esté importado correctamente */}
        <Route path="/transactionsE" element={<TransactionsE />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
