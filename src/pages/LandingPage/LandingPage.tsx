import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

const data = [
    {
        title: 'Customer',
        description: [
            'Create your account',
            'Find your hairsalon',
            'Check the available services and prices',
            'Book an appointment with your favorite hairdresser',
        ],
        buttonText: 'Sign up',
        buttonVariant: 'contained',
    },
    {
        title: 'Hairdresser',
        subheader: 'For professionals',
        description: [
            'Create your account',
            'Register your hairsalon',
            'Enter your services and availability',
            'Get notified when a customer books an appointment with you',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
];

export default function LandingPage() {
    return (
        <>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />

            {/* Hero unit */}
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    HairBooker
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    Quickly book an appointment with your favorite hairdresser
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {data.map((item) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={item.title} xs={6}>
                            <Card>
                                <CardHeader
                                    title={item.title}
                                    subheader={item.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <ul>
                                        {item.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    {item.title === 'Customer' ? (
                                        <Button
                                            fullWidth
                                            variant={item.buttonVariant as 'outlined' | 'contained'}
                                            component={RouterLink}
                                            to="/sign-up/customer"
                                        >
                                            {item.buttonText}
                                        </Button>
                                    ) : (
                                        <Button
                                            fullWidth
                                            variant={item.buttonVariant as 'outlined' | 'contained'}
                                            component={RouterLink}
                                            to="/sign-up/hairdresser"
                                        >
                                            {item.buttonText}
                                        </Button>
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}
