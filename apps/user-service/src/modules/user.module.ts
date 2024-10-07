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
import { DeleteUserHandler } from '../application/commands/handlers/delete-user.handler';
import { KakaoModule } from '../infrastructure/kakao/kakao.module';
import { GetKakaoAuthUrlHandler } from '../application/queries/handlers/get-kakao-auth-url.handler';
import { KakaoLoginHandler } from '../application/commands/handlers/kakako-login.handler';

@Module({
  imports: [KakaoModule, CqrsModule, DatabaseModule, JwtTokenModule],
  providers: [
    JwtAuthGuard,
    UserResolver,
    UserService,
    UserRepository,
    CreateUserHandler,
    LoginUserHandler,
    DeleteUserHandler,
    GetKakaoAuthUrlHandler,
    KakaoLoginHandler,
  ],
  exports: [UserResolver],
})
export class UserModule {}
