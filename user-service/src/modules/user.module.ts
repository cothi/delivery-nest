import { Module } from '@nestjs/common';
import { UserResolver } from '../presentation/resolver/user.resolver';
import { UserService } from '../application/services/user.service';
import { UserRepository } from '../infrastructure/persistence/user.repository';
import { DatabaseModule } from '../infrastructure/prisma/database.module';
import { JwtTokenModule } from '../utils/jwt/jwt.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from '../application/commands/handlers/create-user.handler';
import { LoginUserHandler } from '../application/queries/handlers/login-user.handler';
import { JwtAuthGuard } from '../utils/guard/jwt-auth.guard';

@Module({
  imports: [CqrsModule, DatabaseModule, JwtTokenModule],
  providers: [
    JwtAuthGuard,
    UserResolver,
    UserService,
    UserRepository,
    CreateUserHandler,
    LoginUserHandler,
  ],
  exports: [UserResolver],
})
export class UserModule {}
