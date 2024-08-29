import {Module} from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloFederationDriver, ApolloFederationDriverConfig} from "@nestjs/apollo";
import {OrderResolver} from "./presentaion/resolver/order.resolver";

@Module({
  imports: [
      GraphQLModule.forRoot<ApolloFederationDriverConfig>({
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
      }),
  ],
  controllers: [],
  providers: [OrderResolver],
})
export class AppModule {}
