import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function App() {
  const location = useLocation();

  const getValue = () => {
    if (location.pathname === '/') {
      return 0;
    } else if (location.pathname === '/customers') {
      return 1;
    } else if (location.pathname === '/trainings') {
      return 2;
    } else {
      return 0;
    }
  };

  return (
    <div>
      <Tabs centered value={getValue()}>
        <Tab label="Home" component={Link} to="/" />
        <Tab label="Customer List" component={Link} to="/customers" />
        <Tab label="Training List" component={Link} to="/trainings" />
      </Tabs>
      <Outlet />
    </div>
  );
};
