import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
function Successpage(){
    const navigate = useNavigate();
    return(
        <div style={{textAlign:'center',paddingTop:'10%'}}>
        <h1>Password Changed Successfully</h1>
        <Button 
        sx={{mt:3}}
        variant="contained" color="success"
        onClick={()=>navigate('/login')}
        >Continue to Login</Button>
        </div>
    )
}
export default Successpage