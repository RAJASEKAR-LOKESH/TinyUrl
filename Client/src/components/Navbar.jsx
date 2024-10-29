import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                   URL SHORTNER
                </Typography>
                {
                    user?
                    (<>
                        <Button color="inherit"  component={Link} to="/home"
                        sx={{textTransform:'none'}}>Short_URL</Button>
                        <Button color="inherit" component={Link} to="/myurl"
                        sx={{textTransform:'none'}}>My URL</Button>
                        <Button color="inherit" component={Link} to="/dashboard"
                        sx={{textTransform:'none'}}>Dashboard</Button>
                        <Button color='inherit' onClick={logout}
                        sx={{textTransform:'none'}}>Logout</Button>
                    </>):

                    (<>
                        <Button color="inherit" component={Link} to="/login"
                        sx={{textTransform:'none'}}>Login</Button>
                        <Button color="inherit" component={Link} to="/register"
                        sx={{textTransform:'none'}}>Register</Button>
                    </>)
                }
                
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
