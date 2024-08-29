import { Module } from '@nestjs/common';
import { UserResolver } from '../presentation/resolver/user.resolver';
import { UserService } from '../application/services/user.service';
import { UserRepository } from '../infrastructure/persistence/user.repository';
import { DatabaseModule } from '../infrastructure/prisma/database.module';
import { JwtTokenModule } from '../utils/jwt/jwt.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from '../application/commands/handlers/create-user.handler';

@Module({
  imports: [CqrsModule, DatabaseModule, JwtTokenModule],
  providers: [UserResolver, UserService, UserRepository, CreateUserHandler],
  exports: [UserResolver],
})
export class UserModule {}
