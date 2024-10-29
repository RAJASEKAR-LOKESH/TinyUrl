import React, { useContext, useState } from 'react'
import { Button, TextField, Typography, Container, CircularProgress } from '@mui/material'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        setLoading(true);
        try {
            await login(email, password);
            navigate('/home');
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Invalid email or password");
            }
            else if(err.response && err.response.status === 403){
                setError("Please activate your account");
            } else {
                setError("Invalid email or password");
            }
            console.log(err);
        }finally {
            setLoading(false);
        }
    }
    return (
        <Container maxWidth="xs">
            <Typography variant="h4" component="h1" align="center" sx={{pt:2}} gutterBottom> Login </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={email}
                    error={!!error}
                    helperText={error} 
                    onChange={(e) => setEmail(e.target.value)}>
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
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{marginTop:0.5}}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                </Button>
                <div style={{textAlign:'center',marginTop:'7px'}}>
                <Button 
                style={{ textTransform: 'none' }} 
                onClick={()=>navigate('/form')}
                >Forgot Password?</Button>
                </div>
                
            </form>
        </Container>
    )
}

export default Login