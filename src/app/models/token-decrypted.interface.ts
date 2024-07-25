export interface TokenDecrypted {
    loginId: number;
    role: 'ROLE_USER' | 'ROLE_ADMIN';
    userId?: number;
    picture?: string;
    sub: string;
    iat: number;
    exp: number;
}