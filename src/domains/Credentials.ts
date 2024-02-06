import { Dayjs } from 'dayjs';

export interface UserCredentials {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    userType?: string;
}

export interface HairdresserCredentials {
    startTime?: Dayjs;
    endTime?: Dayjs;
}

export interface CredentialsToken {
    token: string;
}

export interface BadCredentialsResponse {
    success: false;
    error: 'BAD_CREDENTIALS';
}

export interface Customer {
    id: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}

export interface SuccessfulResponse extends CredentialsToken {
    token: string;
}

export interface ErrorResponse {
    success: false;
}

export type AuthenticationResponse = BadCredentialsResponse | SuccessfulResponse | ErrorResponse;
