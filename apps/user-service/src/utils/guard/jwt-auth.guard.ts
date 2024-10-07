import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { errorFactory } from '../exception/error-factory';
import { ErrorCode } from '../exception/enums/error-code.enum';
import { JwtTokenService } from '../jwt/jwt.service';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtTokenService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    try {
      const payload = this.jwtService.verifyToken(token);
      req['user'] = payload;
      return true;
    } catch (e) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
  }
  private extractTokenFromHeader(req: any): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
