
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from '@jwt/jwt-token.interface';

export const TokenInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = GqlExecutionContext.create(ctx);
    const getCtx = request.getContext();
    return getCtx.req.user.payload;
  },
);
