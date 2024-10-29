import  {  useEffect, useState } from 'react';
import { Button, TextField, Typography, Container, CircularProgress } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import http from '../../utils/http';

function Newform() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValidating, setIsValidating] = useState(true); // Loading state for token validation
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/user/reset-password?token=${token}&email=${email}`);
                if (response.ok) {
                    setIsValid(true); // Token is valid, proceed with password reset form
                } else {
                    setIsValid(false); // Invalid or expired token
                }
            } catch (error) {
                console.error('Error validating token:', error);
            } finally {
                setIsValidating(false); // End validation loading state
            }
        };

        if (token && email) {
            validateToken();
        }
    }, [token, email]);

    if (isValidating) {
        return (
            <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!isValid) {
        return <div style={{textAlign:'center',paddingTop:'10%',fontWeight:'bold'}}><p>Invalid or expired token.</p></div>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const res = await http.post('/user/update-password', { email, token, password: newPassword });
            if (res.status === 200) {
                navigate('/successpage');
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Invalid or expired token.");
            } else {
                setError("Failed to reset password.");
            }
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" component="h1" align="center" sx={{ pt: 3 }} gutterBottom>Reset Password</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="New Password"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    type="password"
                    value={newPassword}
                    error={!!error}
                    helperText={error} 
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                </Button>
            </form>
        </Container>
    );
}

export default Newform;
