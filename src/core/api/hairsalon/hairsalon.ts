import { CredentialsToken } from '../../../domains/Credentials';
import { HairSalonResponse } from '../../../domains/HairSalon';
import { GOLANG_API_BASE_URL } from '../../../utils/Constant';

export const hairsalon = (token: string): Promise<HairSalonResponse> => {
    const BASE_URL = GOLANG_API_BASE_URL;

    return fetch(`${BASE_URL}/hair_salon`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response: Response): Promise<HairSalonResponse> => {
            if (response.status === 401) {
                return Promise.resolve({
                    success: false,
                    error: 'BAD_CREDENTIALS',
                });
            }

            if (!response.ok) {
                throw {
                    response: response,
                    error: new Error(
                        `Error: ${response.url} ${response.status} ${response.statusText}`
                    ),
                };
            }

            return response.json().then((json) => {
                return {
                    data: json.data,
                };
            });
        })
        .catch((e) => {
            return {
                success: false,
                error: e.error || 'An error occurred during login.',
            };
        });
};
