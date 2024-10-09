"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayErrorFormatter = void 0;
const graphql_1 = require("graphql");
class GatewayErrorFormatter {
    static formatError(formattedError, // 포맷된 에러
    error) {
        // 1. GraphQLError인 경우 처리
        if (error instanceof graphql_1.GraphQLError) {
            const extensions = error.extensions || {};
            return {
                ...formattedError, // 기존의 포맷된 에러 유지
                message: error.message, // 원본 에러 메시지 덮어쓰기
                extensions: {
                    ...formattedError.extensions, // 기존 확장 정보 유지
                    code: extensions.code || 'INTERNAL_SERVER_ERROR', // 기본값 추가
                    status: extensions.status || 500, // 기본 HTTP 상태 코드
                    timestamp: new Date().toISOString(),
                    service: extensions.serviceName || 'unknown', // 서비스 이름
                    ...(process.env.NODE_ENV !== 'production' && {
                        stacktrace: error.stack,
                    }),
                },
            };
        }
        // 2. GraphQLError가 아닌 경우 처리 (일반적인 unknown 타입 에러 처리)
        if (error instanceof Error) {
            return {
                message: error.message || 'INTERNAL_SERVER_ERROR', // 일반 Error 메시지
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR',
                    status: 500, // HTTP 상태 코드 추가
                    timestamp: new Date().toISOString(),
                    ...(process.env.NODE_ENV !== 'production' && {
                        stacktrace: error.stack,
                    }),
                },
            };
        }
        // 3. Unknown 에러일 경우 기본 에러 처리
        return {
            message: 'INTERNAL_SERVER_ERROR',
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                status: 500,
                timestamp: new Date().toISOString(),
            },
        };
    }
}
exports.GatewayErrorFormatter = GatewayErrorFormatter;
//# sourceMappingURL=gateway-error-formatter.js.map