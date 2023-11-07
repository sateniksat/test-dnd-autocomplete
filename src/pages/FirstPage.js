import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

export default function FirstPage() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" dir="rtl" sx={{display: 'flex' ,justifyContent: 'center',pt:6}}>
        <Link to="/home">

      <Button variant="outlined" sx={{mx:1}}>Home</Button>
        </Link>
        <Link to="/login">

      <Button variant="outlined" sx={{mx:1}}>Login</Button>
        </Link>
      </Container>
    </React.Fragment>
  );
}