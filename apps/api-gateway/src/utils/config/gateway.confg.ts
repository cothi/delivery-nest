import {
  IntrospectAndCompose,
  ServiceEndpointDefinition,
} from '@apollo/gateway';
import { CombinedDataSource } from '../data-source/combine-data-source';

export const gatewayConfig = {
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'orders', url: 'http://order-service:3001/graphql' },
      { name: 'users', url: 'http://user-service:3002/graphql' },
      { name: 'restaurants', url: 'http://restaurants-service:3003/graphql' },
      { name: 'payments', url: 'http://payment-service:5000/graphql' },
    ],
  }),
  buildService({ url }: ServiceEndpointDefinition) {
    return new CombinedDataSource({ url });
  },
};
