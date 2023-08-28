import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { alpha } from '@mui/material/styles';

export default function SignUpTwo() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #ccc',
          padding: 10,
          borderRadius: 7,
        }}
      >
        <Typography align="center" variant="h5" sx={{ paddingBottom: 3 }}>
          Sign Up
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            borderRadius: '50%',
            width: 64,
            height: 64,
          }}
        >
          +
        </Button>
        <TextField label="First name" variant="outlined" size="medium" />
        <TextField label="Last name" variant="outlined" size="medium" />
        <TextField label="Address" variant="outlined" size="medium" />
        <Box
          sx={{ display: 'flex', justifyContent: 'center', gap: 1, padding: 2 }}
        >
          <Button variant="outlined" href="/signup1">
            Back
          </Button>
          <Button variant="contained">Sign up</Button>
        </Box>
      </Box>
    </Box>
  );
}
