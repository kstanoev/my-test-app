import { Box, Button, TextField, Typography} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';

export default function LogIn() {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, border: '1px solid #ccc', padding: 10, borderRadius: 7}}>
            <Typography
                align='center'
                variant='h5'
                sx={{ paddingBottom: 5 }}
            >
                Log In
            </Typography>
            <TextField 
                label='Username*' 
                variant='outlined'
                size='medium'
            />
            <TextField 
                label='Password*' 
                variant='outlined'
                size='medium'
            />
            <Button variant="contained" startIcon={<LoginIcon />}>
                Log in
            </Button>
            <Link to="/signup1" style={{ textDecoration: 'none' }}>
                Create account
            </Link>
        </Box>
      </Box>
    );
}