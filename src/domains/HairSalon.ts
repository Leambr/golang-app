export interface HairSalon {
    id: string;
    name: string;
    address: string;
    description: string;
    is_accepted: boolean;
}

export interface HairSalonData {
    data: HairSalon[] | undefined;
}

export interface BadCredentialsResponse {
    success: false;
    error: 'BAD_CREDENTIALS';
}

export interface ErrorResponse {
    success: false;
}

export type HairSalonResponse = HairSalonData | BadCredentialsResponse | ErrorResponse;
