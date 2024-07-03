import React from "react";
import { Container, Typography } from "@mui/material";

const About: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        About Page
      </Typography>
      <Typography variant="body1">
        This is the About page. You can provide some information about your application here.
      </Typography>
    </Container>
  );
};

export default About;
