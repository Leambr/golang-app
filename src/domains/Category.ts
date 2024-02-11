export interface Category {
    id: string;
    name: string;

}

export interface CategoryData {
    data: Category;
}


export interface BadCredentialsResponse {
    success: false;
    error: 'BAD_CREDENTIALS';
}

export interface ErrorResponse {
    success: false;
}

export type CategoryResponse = CategoryData | BadCredentialsResponse | ErrorResponse;
