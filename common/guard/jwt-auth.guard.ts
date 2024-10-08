import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtTokenService } from '@jwt/jwt.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ErrorCode } from '@exception/error-code.enum';
import { errorFactory } from '@exception/error-factory.exception';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtTokenService: JwtTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    try {
      const payload = this.jwtTokenService.verifyToken(token);
      req['user'] = payload;
      return true;
    } catch {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
  }

  private extractTokenFromHeader(req: any): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
