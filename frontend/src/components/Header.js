import { ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { authActions } from '../store';

axios.defaults.withCredentials = true;

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });
    if (res.status == 200) {
      return res;
    }
    return new Error("Unable TO Logout. Please try again");
  };
  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  };

  const [value, setValue] = useState();
  const theme = {
    spacing: 4,
  }
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <ThemeProvider theme={theme}>
            <Typography variant="h3" sx={{fontFamily: ["Kaushan Script"]}}>KL Print & Design</Typography>
          </ThemeProvider>
          <Box sx={{ marginLeft: "auto"}}>
            <Tabs
              indicatorColor="secondary"
              onChange={(e, val) => setValue(val)}
              value={value}
              textColor="inherit"
            >
              {!isLoggedIn && (
                <div>
                  {" "}
                  <Tab to="/login" LinkComponent={Link} label="Prijava" />
                  <Tab to="/signup" LinkComponent={Link} label="Registracija" />
                </div>
              )}
              {isLoggedIn && (
                <Tab
                  onClick={handleLogout}
                  to="/"
                  LinkComponent={Link}
                  label="Odjava"
                />
              )}{" "}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
