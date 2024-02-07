import { getCredentials, verifyCredentials } from '../../core/utils/credentials';
import { useState, useEffect } from 'react';
import { HairSalon, HairSalonData, HairSalonResponse } from '../../domains/HairSalon';
import { hairsalon } from '../../core/api/hairsalon/hairsalon';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { CredentialsToken } from '../../domains/Credentials';

export const CustomerHomePage = () => {
    const [hairSalon, setHairSalon] = useState<any>();
    console.log('🚀 ~ CustomerHomePage ~ hairSalon:', hairSalon);
    const [token, setToken] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            const getToken = await getCredentials();
            setToken(getToken?.token);

            if (getToken?.token) {
                // Utiliser getToken?.token directement ici
                const hairSalonData = await hairsalon(getToken?.token);
                if (hairSalonData) {
                    setHairSalon(hairSalonData);
                } else {
                    console.error(
                        "Une erreur s'est produite lors de la récupération des données du salon de coiffure."
                    );
                }
            }
        };
        fetchData();
    }, []);

    verifyCredentials();
    return (
        <div>
            CustomerHomePage
            <section>
                {hairSalon ? (
                    hairSalon.data.map(
                        (
                            salon: any
                            // Ajoutez salon et index comme arguments de la fonction de rappel
                        ) => (
                            <div key={salon.id}>
                                <Box sx={{ minWidth: 275 }}>
                                    {/* Ajoutez une clé unique pour chaque élément */}
                                    <CardContent>
                                        <Typography
                                            sx={{ fontSize: 14 }}
                                            color="danger"
                                            gutterBottom
                                        >
                                            {salon.name} {/* Utilisez les données du salon ici */}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {salon.address}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="danger">
                                            {salon.description}
                                        </Typography>
                                        {/* Ajoutez d'autres données du salon ici */}
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Box>
                            </div>
                        )
                    )
                ) : (
                    <div>rien</div>
                )}
            </section>
        </div>
    );
};
