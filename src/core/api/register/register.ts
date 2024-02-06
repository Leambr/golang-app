import {
    AuthenticationResponse,
    UserCredentials,
    HairdresserCredentials,
} from '../../../domains/Credentials';
import { GOLANG_API_BASE_URL } from '../../../utils/Constant';

export const register = (
    firstname: UserCredentials['firstname'],
    lastname: UserCredentials['lastname'],
    email: UserCredentials['email'],
    password: UserCredentials['password'],
    userType: UserCredentials['userType'],
    startTime?: HairdresserCredentials['startTime'],
    endTime?: HairdresserCredentials['endTime']
): Promise<AuthenticationResponse> => {
    const BASE_URL = GOLANG_API_BASE_URL;

    return fetch(`${BASE_URL}/register/${userType}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstname,
            lastname,
            email,
            password,
            ...(startTime ? { start_time: startTime } : {}),
            ...(endTime ? { end_time: endTime } : {}),
        }),
    })
        .then((response: Response): Promise<AuthenticationResponse> => {
            if (response.status === 401) {
                return Promise.resolve({
                    success: false,
                    error: 'BAD_CREDENTIALS',
                });
            }

            if (!response.ok) {
                throw new Error(
                    `Upstream auth HTTP error: ${response.status} ${response.statusText}`
                );
            }

            return response.json().then((json) => {
                return {
                    success: true,
                    token: json.token,
                    user: json.user,
                };
            });
        })
        .catch((e) => {
            return {
                success: false,
                error: e.error || 'An error occurred during signup.',
            };
        });
};
