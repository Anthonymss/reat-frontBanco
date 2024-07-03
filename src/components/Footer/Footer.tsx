import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";
import { Facebook, Twitter, LinkedIn, GitHub } from "@mui/icons-material";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footerMod">
      <Container>
        <Typography variant="h6" align="center" gutterBottom>
          Sistema Bancario Distribuido
        </Typography>
        <Typography variant="body2" color="" align="center" paragraph>
          &copy; 2024 Todos los derechos reservados.
        </Typography>
        <Box
          className="social-icons"
          sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
        >
          <Link href="https://facebook.com" target="_blank" color="inherit">
            <Facebook />
          </Link>
          <Link href="https://twitter.com" target="_blank" color="inherit">
            <Twitter />
          </Link>
          <Link href="https://linkedin.com" target="_blank" color="inherit">
            <LinkedIn />
          </Link>
          <Link href="https://github.com" target="_blank" color="inherit">
            <GitHub />
          </Link>
        </Box>
        <Typography variant="body2" color="" align="center" paragraph>
          Contacto: info@sistemabancario.com | Tel: +123 456 789
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
