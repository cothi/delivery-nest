"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const gateway_confg_1 = require("./utils/config/gateway.confg");
const server_confg_1 = require("./utils/config/server.confg");
const apollo_1 = require("@nestjs/apollo");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloGatewayDriver,
                server: server_confg_1.serverConfig,
                gateway: gateway_confg_1.gatewayConfig,
            }),
        ],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map