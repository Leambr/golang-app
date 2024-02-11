export interface HairSalon {
    id: string;
    name: string;
    address: string;
    description: string;
    is_accepted: boolean;
}

export interface HairSalonDataByID {
    data: HairSalon;
}

export interface BadCredentialsResponse {
    success: false;
    error: 'BAD_CREDENTIALS';
}

export interface ErrorResponse {
    success: false;
}

export type HairSalonResponse = HairSalonDataByID | BadCredentialsResponse | ErrorResponse;
