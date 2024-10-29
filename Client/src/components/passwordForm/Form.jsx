import React, { useState } from 'react';
import { Button, TextField, Typography, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import http from '../../utils/http';

function Form() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Set loading to true on submit

        try {
            await http.post('/user/requestPasswordReset', { email });
            navigate('/mail');
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError("Invalid Email");
            } else {
                setError("Invalid Email");
            }
            console.log(err);
        } finally {
            setLoading(false); // Set loading to false once request is complete
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" component="h1" align="center" sx={{ pt: 3 }} gutterBottom>
                Reset Password
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Enter Registered Email"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={email}
                    error={!!error}
                    helperText={error}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                    fullWidth
                    disabled={loading} // Disable button when loading
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                </Button>
            </form>
        </Container>
    );
}

export default Form;
