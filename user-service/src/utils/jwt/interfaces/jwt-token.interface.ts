import { TokenType } from '../enum/token.enum';

export interface JwtPayload {
  email: string;
  userId: string;
  type?: TokenType;
}

export interface TokenResult {
  isValid: boolean;
  payload: JwtPayload;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
