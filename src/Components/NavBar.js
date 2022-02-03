import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const NavBar = ({isConnected, shortAddress, connectWalletHandler}) => {
  console.log(isConnected)
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Portfolio Tracker
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
              {!isConnected ? <Button 
                variant="contained" 
                sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} 
                onClick={connectWalletHandler}>Connect</Button>
                : <Alert   
                variant='outlined'      
                icon={false}
                severity="info"
                sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>{shortAddress}</Alert>}
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Portfolio Tracker
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
              {!isConnected ? <Button 
                variant="contained" 
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} 
                onClick={connectWalletHandler}>Connect</Button>
                : <Alert
                variant='outlined'
                icon={false}
                severity="info"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>{shortAddress}</Alert>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
