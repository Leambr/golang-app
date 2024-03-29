import { AuthenticationResponse, UserCredentials } from '../../../domains/Credentials';
import { GOLANG_API_BASE_URL } from '../../../utils/Constant';

export const login = (
    email: UserCredentials['email'],
    password: UserCredentials['password'],
    userType: UserCredentials['userType']
): Promise<AuthenticationResponse> => {
    const BASE_URL = GOLANG_API_BASE_URL;

    return fetch(`${BASE_URL}/login/${userType}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response: Response): Promise<AuthenticationResponse> => {
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
                    token: json.token,
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
