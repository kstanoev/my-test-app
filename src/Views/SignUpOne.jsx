import { Box, Button, TextField, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from '../common/constants';

export default function SignUpOne() {
    // Password Field
    const [showPassword, setShowPassword] = useState(false);

    // Confirm Password Field
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Input
    const [usernameInput, setUsernameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const [phoneNumberInput, setPhoneNumberInput] = useState('');

    // Input Errors
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);

    // Validation for onBlur Username
    const handleUsername = () => {
        if(!usernameInput || usernameInput.length < USERNAME_MIN_LENGTH || usernameInput.length > USERNAME_MAX_LENGTH) {
            setUsernameError(true);
        } else {
            setUsernameError(false);
        }
    }

    // Validation for onBlur Email
    const handleEmail = () => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
        setEmailError(!isValidEmail);
    }

    // Validation for onBlur Password
    const handlePassword = () => {
        if(!passwordInput || passwordInput.length < PASSWORD_MIN_LENGTH || passwordInput.length > PASSWORD_MAX_LENGTH) {
            setPasswordError(true);
            return;
        }

        // Check for at least one number and one symbol
        const numberRegex = /\d/;
        const symbolRegex = /[^a-zA-Z0-9\s]/;

        if (!numberRegex.test(passwordInput) || !symbolRegex.test(passwordInput)) {
            setPasswordError(true);
            return;
        }

        setPasswordError(false);
    }

    // Validation for onBlur Confirm Password
    const handleConfirmPassword = () => {
        if (confirmPasswordInput !== passwordInput) {
            setConfirmPasswordError(true);
        } else {
            setConfirmPasswordError(false);
        }
    }

    // Validation for onBlur Phone Number
    const handlePhoneNumber = () => {
        const digitRegex = /^\d+$/; 

        if (!phoneNumberInput || phoneNumberInput.length !== 10 || !digitRegex.test(phoneNumberInput)) {
            setPhoneNumberError(true);
        } else {
            setPhoneNumberError(false);
        }
    }

    const handleNext = (e) => {
        e.preventDefault();
        console.log(usernameInput);
        console.log(emailInput);
        console.log(passwordInput);
        console.log(confirmPasswordInput);
        console.log(phoneNumberInput);
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleMouseDownConfirmPassword = (event) => {
      event.preventDefault();
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, border: '1px solid #ccc', padding: 10, borderRadius: 7}}>
            <Typography
                align='center'
                variant='h5'
                sx={{ paddingBottom: 5 }}
            >
                Sign Up
            </Typography>
            {/* <form> */}
                <TextField 
                    label='Username' 
                    variant='outlined'
                    value={usernameInput}
                    onChange={(event) => setUsernameInput(event.target.value)}
                    onBlur={handleUsername}
                    error={usernameError}
                    size='medium'
                    required
                />
                <TextField 
                    label='E-mail' 
                    variant='outlined'
                    value={emailInput}
                    onChange={(event) => setEmailInput(event.target.value)}
                    onBlur={handleEmail}
                    error={emailError}
                    size='medium'
                    required
                />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordInput}
                        onChange={(event) => setPasswordInput(event.target.value)}
                        onBlur={handlePassword}
                        error={passwordError}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                        required
                    />
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPasswordInput}
                        onChange={(event) => setConfirmPasswordInput(event.target.value)}
                        onBlur={handleConfirmPassword}
                        error={confirmPasswordError}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                            edge="end"
                            >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Confirm password"
                        required
                    />
                </FormControl>
                <TextField 
                    label='Phone number' 
                    variant='outlined'
                    value={phoneNumberInput}
                    onChange={(event) => setPhoneNumberInput(event.target.value)}
                    onBlur={handlePhoneNumber}
                    error={phoneNumberError}
                    size='medium'
                    required
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, padding: 2}}>
                    <Button variant="outlined" href='/login'>Log In</Button>
                    <Button type='submit' href='/signup2' variant="contained" onClick={handleNext}>Next</Button>
                </Box>
            {/* </form>            */}
        </Box>
      </Box>
    );
  }