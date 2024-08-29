import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, TokenPair, TokenResult } from './interfaces/jwt-token.interface';
import { TOKEN_TIME_TYPE, TokenType } from './enum/token.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  generateTokenPair(payload: JwtPayload): TokenPair {
    payload.type = TokenType.ACCESS;
    const accessToken = this.generateToken(payload);
    payload.type = TokenType.REFRESH;
    const refreshToken = this.generateToken(payload);
    return {
      accessToken,
      refreshToken,
    };
  }
  generateToken(payload: JwtPayload): string {
    let time: string;
    if (payload.type == TokenType.ACCESS) {
      time = TOKEN_TIME_TYPE.ACCESS;
    } else {
      time = TOKEN_TIME_TYPE.REFRESH;
    }
    return this.jwtService.sign(
      { ...payload },
      { expiresIn: this.configService.get<string>(time) },
    );
  }

  generateAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): TokenResult {
    try {
      const payload: JwtPayload = this.jwtService.verify(token);
      return {
        isValid: true,
        payload,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
