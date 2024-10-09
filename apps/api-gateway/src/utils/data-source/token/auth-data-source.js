"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDataSource = void 0;
// 인증 처리를 위한 클래스
const gateway_1 = require("@apollo/gateway");
class AuthDataSource extends gateway_1.RemoteGraphQLDataSource {
    async willSendRequest({ request, context, }) {
        if (context.token) {
            request.http?.headers.set('authorization', context.token);
        }
    }
}
exports.AuthDataSource = AuthDataSource;
//# sourceMappingURL=auth-data-source.js.map