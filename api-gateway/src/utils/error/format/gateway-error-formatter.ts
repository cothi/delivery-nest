import { GraphQLError, GraphQLFormattedError } from 'graphql';

export class GatewayErrorFormatter {
  static formatError(error: GraphQLError): GraphQLFormattedError {
    const extensions = error.extensions;

    console.log(error);
    return {
      message: error.message,
      locations: error.locations,
      path: error.path,
      extensions: {
        code: extensions.code,
        status: extensions.status,
        timestamp: new Date().toISOString(),
        service: extensions.serviceName || 'unknown',
        ...(process.env.NODE_ENV !== 'production' && {
          stacktrace: error.stack,
        }),
      },
    };
  }
}
