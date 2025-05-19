import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
    id: number;
    username: string;
}

export const getJwtToken = (): string | null => {
    return localStorage.getItem('authToken');
};

export const decodeJwt = (token: string): DecodedToken | null => {
    try {
        return jwtDecode<DecodedToken>(token);
    } catch (error) {
        console.error('Erreur de décodage du JWT:', error);
        return null;
    }
};

export const getDecodedJwt = (): DecodedToken | null => {
    const token = getJwtToken();
    if (token) {
        return decodeJwt(token);
    }
    return null;
};
