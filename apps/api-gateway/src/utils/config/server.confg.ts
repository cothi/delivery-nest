import { GatewayErrorFormatter } from '../error/format/gateway-error-formatter';
import { Request } from 'express';

export const serverConfig = {
  formatError: GatewayErrorFormatter.formatError,
  context: ({ req }: { req: Request }) => {
    const authHeader = req.headers.authorization || undefined;
    return { token: authHeader };
  },
};
