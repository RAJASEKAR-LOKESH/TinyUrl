import React, { useState, useEffect } from 'react';
import { Typography, Container, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import http from '../../utils/http';

function Myurl() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await http.get('/url');
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchData();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ pt: 3 }}>
            <Container maxWidth="lg" sx={{ pt: 3, pb: 3, backgroundColor: '#F8F9FA' }}>
                <Typography style={{ fontWeight: "bold", fontSize: "20px", textAlign: 'center', marginBottom: '12px' }}>
                    Below Table shows the Shortened URLs
                </Typography>

                <TableContainer component={Paper}>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: 'GrayText', color: 'white' }}>
                                <TableCell style={{ padding: '7px',color:'white' }}>S.No</TableCell>
                                <TableCell align="center" style={{ color:'white' }}>Long URL</TableCell>
                                <TableCell align="center" style={{ color:'white' }}>Shorten URL</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? ( 
                                <TableRow>
                                    <TableCell colSpan={3} style={{ textAlign: 'center', padding: '20px' }}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : user.length === 0 ? ( 
                                <TableRow>
                                    <TableCell colSpan={3} style={{ textAlign: 'center', padding: '20px' }}>
                                        No data found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                user.map((users, index) => (
                                    <TableRow 
                                        key={users._id} 
                                        style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}
                                    >
                                        <TableCell style={{ textAlign: 'left', padding: '10px' }}>{index + 1}.</TableCell>
                                        <TableCell style={{ textAlign: 'left' }}>{users.originalUrl}</TableCell>
                                        <TableCell style={{ textAlign: 'left' }}>{users.shortenUrl}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Container>
    );
}

export default Myurl;
