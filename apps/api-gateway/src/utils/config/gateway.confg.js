"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatewayConfig = void 0;
const gateway_1 = require("@apollo/gateway");
const combine_data_source_1 = require("../data-source/combine-data-source");
exports.gatewayConfig = {
    supergraphSdl: new gateway_1.IntrospectAndCompose({
        subgraphs: [
            { name: 'orders', url: 'http://order-service:3001/graphql' },
            { name: 'users', url: 'http://user-service:3002/graphql' },
            { name: 'restaurants', url: 'http://restaurants-service:3003/graphql' },
            { name: 'payments', url: 'http://payment-service:5000/graphql' },
        ],
    }),
    buildService({ url }) {
        return new combine_data_source_1.CombinedDataSource({ url });
    },
};
//# sourceMappingURL=gateway.confg.js.map