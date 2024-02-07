import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { register } from '../../core/api/register/register';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { setCredentials } from '../../core/utils/credentials';

export default function SignUp() {
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [startTime, setStartTime] = useState(null);

    const navigate = useNavigate();

    const [endTime, setEndTime] = useState(null);

    const { userType } = useParams();
    const hairdresserUser = userType === 'hairdresser';
    const customerUser = userType === 'customer';

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (hairdresserUser) {
            if (firstName && lastName && email && password && startTime && endTime) {
                const userTokenResponse = await register(
                    firstName,
                    lastName,
                    email,
                    password,
                    userType,
                    startTime,
                    endTime
                );
                if ('token' in userTokenResponse) {
                    const userToken = userTokenResponse.token;
                    console.log(userToken);
                    setCredentials('token', userToken);
                    navigate('/home-hairdresser');
                } else {
                    console.error("Mauvaises informations d'identification fournies");
                }
            }
        }
        if (customerUser) {
            if (firstName && lastName && email && password) {
                const userTokenResponse = await register(
                    firstName,
                    lastName,
                    email,
                    password,
                    userType
                );
                if ('token' in userTokenResponse) {
                    const userToken = userTokenResponse.token;
                    console.log(userToken);
                    setCredentials('token', userToken);
                    navigate('/home-customer');
                } else {
                    console.error("Mauvaises informations d'identification fournies");
                }
            }
        }
    };

    const updateStartTime = (newValue) => {
        const formattedStartTime = newValue ? newValue.format('HH:mm') : null;
        console.log('🚀 ~ updateStartTime ~ formattedTime:', formattedStartTime);

        setStartTime(formattedStartTime);
    };

    const updateEndTime = (newValue) => {
        const formattedEndTime = newValue ? newValue.format('HH:mm') : null;
        setEndTime(formattedEndTime);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up {userType}
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Grid>
                        {hairdresserUser && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            label="Start time"
                                            value={startTime}
                                            onChange={updateStartTime}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            label="End time"
                                            value={endTime}
                                            onChange={updateEndTime}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link
                                component={RouterLink}
                                to={hairdresserUser ? '/sign-up/customer' : '/sign-up/hairdresser'}
                                variant="body2"
                            >
                                {hairdresserUser
                                    ? 'Sign up as a customer?'
                                    : 'Sign up as a hairdresser?'}
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Link
                                component={RouterLink}
                                to={`/sign-in/${userType}`}
                                variant="body2"
                            >
                                {'Already have an account? Sign in'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
