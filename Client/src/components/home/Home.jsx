// src/components/UrlShortener.js
import React, { useState } from 'react';
import http from '../../utils/http';
import { TextField, Button, Typography, Container, Box, CircularProgress, Grid } from '@mui/material';

function Home() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setShortUrl('');
        setLoading(true);
        setShowResult(false);

        try {
            const response = await http.post('/url/shorten', { originalUrl });
            setShortUrl(response.data.shortenUrl);
            setShowResult(true);  
        } catch (err) {
            setError('Failed to shorten URL. Please try again.');
            console.error(err);
        } finally {
            setLoading(false); 
        }
    };

    const handleNewUrl = () => {
        setOriginalUrl('');
        setShowResult(false);
    };

    return (
        <Container maxWidth="sm" sx={{ pt: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {!showResult ? (
                        <Container sx={{ pt: 4, pb: 4, backgroundColor: '#F8F9FA', borderRadius: 2, border: "2px solid grey" }}>
                            <Typography variant="h6" align="center" gutterBottom>Shorten a long URL</Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Enter long URL"
                                    variant="outlined"
                                    fullWidth
                                    value={originalUrl}
                                    onChange={(e) => setOriginalUrl(e.target.value)}
                                    required
                                    margin="normal"
                                />
                                <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 3, textTransform: 'none' }}>
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Shorten URL'}
                                </Button>
                            </form>
                        </Container>
                    ) : (
                        <Container sx={{ pt: 4, pb: 4, backgroundColor: '#E9F7EF', borderRadius: 2, border: "2px solid grey" }}>
                            <Typography variant="h6" align="center" gutterBottom>Shortened URL</Typography>
                            <TextField
                                label="Long URL"
                                variant="outlined"
                                fullWidth
                                value={originalUrl}
                                InputProps={{
                                    readOnly: true,
                                }}
                                margin="normal"
                            />
                            <TextField
                                label="Short URL"
                                variant="outlined"
                                fullWidth
                                value={shortUrl}
                                InputProps={{
                                    readOnly: true,
                                }}
                                margin="normal"
                            />
                            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                                <Button 
                                    variant="outlined" 
                                    color="primary" 
                                    href={shortUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    fullWidth
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    Visit Link
                                </Button>
                                <Button 
                                    variant="contained" 
                                    color="success" 
                                    onClick={handleNewUrl} 
                                    fullWidth
                                >
                                    Shorten Another
                                </Button>
                            </Box>
                        </Container>
                    )}
                </Grid>
                {error && (
                    <Grid item xs={12}>
                        <Typography color="error" align="center" sx={{ mt: 3 }}>{error}</Typography>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
}

export default Home;
