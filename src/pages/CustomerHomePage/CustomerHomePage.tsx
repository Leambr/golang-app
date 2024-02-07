import { getCredentials, verifyCredentials } from '../../core/utils/credentials';
import { useState, useEffect } from 'react';
import { HairSalonResponse } from '../../domains/HairSalon';
import { hairsalon } from '../../core/api/hairsalon/hairsalon';
// import { CredentialsToken } from '../../domains/Credentials';

export const CustomerHomePage = () => {
    const [hairSalon, setHairSalon] = useState<HairSalonResponse>();
    const [token, setToken] = useState<string>();
    console.log('🚀 ~ CustomerHomePage ~ token:', token);

    useEffect(() => {
        const fetchData = async () => {
            const getToken = await getCredentials();
            setToken(getToken?.token);

            if (getToken?.token) {
                // Utiliser getToken?.token directement ici
                const hairSalonData = await hairsalon(getToken?.token);
                if (hairSalonData) {
                    setHairSalon(hairSalonData);
                }
            }
        };
        fetchData();
    }, []);
    console.log(hairSalon);
    verifyCredentials();
    return <div>CustomerHomePage</div>;
};
