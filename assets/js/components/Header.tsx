
import { Link } from 'react-router-dom';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  title: {
    flexGrow: 1,
  }
}
const Header: React.FC = () => (
  <div >
    <AppBar position="static" style={{ backgroundColor: '#9b4dca' }}>
      <Toolbar>
        <Typography variant="h6" style={styles.title}>
          Comment Box
        </Typography>
        <Button color="inherit" href="/">Home</Button>
        <Button color="inherit" href="/counter">Login</Button>
        <Button color="inherit" href="/about">About</Button>
      </Toolbar>
    </AppBar>
  </div>
);

export default Header;
