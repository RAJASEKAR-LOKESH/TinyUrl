import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button,  Container, CircularProgress } from '@mui/material';
import  {  useEffect, useState } from 'react';
import http from '../../utils/http'

function ActivationSuccess(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isValidating, setIsValidating] = useState(true); 
    const [isValid, setIsValid] = useState(false);
    const email = searchParams.get('email');

    useEffect(() => {
        const validateUser = async () => {
            try {
                const response = await http.post(`/user/activationsuccess`,{email});
                if (response.status==200) {
                    setIsValid(true); 
                } else {
                    setIsValid(false); 
                }
            } catch (error) {
                console.error('Error validating user:', error);
            } finally {
                setIsValidating(false); 
            }
        };

        if (email) {
            validateUser();
        }
    }, [email]);

    if (isValidating) {
        return (
            <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!isValid) {
        return <div style={{textAlign:'center',paddingTop:'10%',fontWeight:'bold'}}><p>Invalid User</p></div>
    }

    return(
        <div style={{textAlign:'center',paddingTop:'10%'}}>
        <h1>Account Activated Successfully</h1>
        <Button 
        sx={{mt:3}}
        variant="contained" color="success"
        onClick={()=>navigate('/login')}
        >Continue to Login</Button>
        </div>
    )
}
export default ActivationSuccess