/**
 * Interface for JWT payload
 * @property sub User ID
 * @property email User email
 * @property iat Issued at
 * @property exp Expiration time
 */
export interface JwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}
