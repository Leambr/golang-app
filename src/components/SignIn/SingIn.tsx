import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { login } from '../../core/api/login/login';
import { setCredentials } from '../../core/utils/credentials';

export default function SignIn() {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const { userType } = useParams();

    const navigate = useNavigate();

    const hairdresserUser = userType === 'hairdresser';

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (email && password) {
            const userTokenResponse = await login(email, password, userType);

            if ('token' in userTokenResponse) {
                const userToken = userTokenResponse.token;
                console.log(userToken);
                setCredentials('token', userToken);
                navigate('/home-customer');
            } else {
                console.error("Mauvaises informations d'identification fournies");
            }
        }
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
                    Sign in {userType}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => handleSubmit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link
                                component={RouterLink}
                                to={hairdresserUser ? '/sign-in/customer' : '/sign-in/hairdresser'}
                                variant="body2"
                            >
                                {hairdresserUser
                                    ? 'Sign in as a customer?'
                                    : 'Sign in as a hairdresser?'}
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Link
                                component={RouterLink}
                                to={`/sign-up/${userType}`}
                                variant="body2"
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
