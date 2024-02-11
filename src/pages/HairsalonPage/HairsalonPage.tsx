import { getCredentials, verifyCredentials } from '../../core/utils/credentials';
import { useState, useEffect } from 'react';
import { hairsalonById } from '../../core/api/hairsalon/hairsalonById';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';

export const HairsalonPage = () => {
    const [hairSalonById, setHairSalonById] = useState<any>();

    const location = useLocation();
    const [token, setToken] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            const searchParams = new URLSearchParams(location.search);
            const idParam = searchParams.get('id');
            const getToken = await getCredentials();
            setToken(getToken?.token);

            if (getToken?.token && idParam != null) {
                // Utiliser getToken?.token directement ici
                const hairSalonData = await hairsalonById(getToken?.token, idParam);

                if (hairSalonData) {
                    setHairSalonById(hairSalonData);
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
                {hairSalonById ? (
                    hairSalonById.data.map(
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
