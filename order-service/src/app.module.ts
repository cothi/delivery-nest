import {Module} from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloFederationDriver, ApolloFederationDriverConfig} from "@nestjs/apollo";
import {OrderModule} from "./order/order.module";
import {DatabaseModule} from "./order/infrastructure/prisma/database.module";

@Module({
  imports: [
      GraphQLModule.forRoot<ApolloFederationDriverConfig>({
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
      }),
      OrderModule,
      DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
