"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = void 0;
const gateway_error_formatter_1 = require("../error/format/gateway-error-formatter");
exports.serverConfig = {
    formatError: gateway_error_formatter_1.GatewayErrorFormatter.formatError,
    context: ({ req }) => {
        const authHeader = req.headers.authorization || undefined;
        return { token: authHeader };
    },
};
//# sourceMappingURL=server.confg.js.map