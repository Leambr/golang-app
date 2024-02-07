export interface HairSalonCredentials {
    data: [];
}

export interface BadCredentialsResponse {
    success: false;
    error: 'BAD_CREDENTIALS';
}

export interface ErrorResponse {
    success: false;
}

export type HairSalonResponse = HairSalonCredentials | BadCredentialsResponse | ErrorResponse;
