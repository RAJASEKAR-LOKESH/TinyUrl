import React, { useContext, useState } from 'react'
import { Button, TextField, Typography, Container, CircularProgress } from '@mui/material'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import http from '../../utils/http'


function Register() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await http.post('/user/adduser', { email, firstName, lastName, password });
            await http.post('/user/activation', { email});
            navigate('/Activation'); 
        } catch (err) {
            console.log(err);
        }finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" component="h1" align="center" gutterBottom 
            sx={{paddingTop:2}}
            > Register </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </TextField>
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}>
                </TextField>
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}>
                </TextField>
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </TextField>
                <Button type="submit" variant="contained" color="primary" fullWidth
                sx={{marginTop:0.5}}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                </Button>
            </form>
        </Container>
    )
}

export default Register