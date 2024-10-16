import { Module } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from '@libs/database';
import { JwtAuthGuard, JwtTokenModule } from '@libs/jwt';
import { KakaoModule } from '@account/user/infrastructure/kakao/kakao.module';
import { UserResolver } from '@account/user/presentation/resolver/user.resolver';
import { UserService } from '@account/user/domain/services/user.service';
import { UserRepositoryImpl } from '@account/user/infrastructure/persistence/user.repository.impl';
import { CreateUserHandler } from '@account/user/application/commands/handlers/create-user.handler';
import { LoginUserHandler } from '@account/user/application/queries/handlers/login-user.handler';
import { DeleteUserHandler } from '@account/user/application/commands/handlers/delete-user.handler';
import { GetKakaoAuthUrlHandler } from '@account/user/application/queries/handlers/get-kakao-auth-url.handler';
import { KakaoLoginHandler } from '@account/user/application/commands/handlers/kakako-login.handler';
import { UserRepositorySymbol } from '@account/user/domain/interfaces/user-repository.interface';
import { UserRoleRepositorySymbol } from '@account/user/domain/interfaces/user-role-repository.interface';
import { UserRoleRepositoryImpl } from '@account/user/infrastructure/persistence/user-role.repository.impl';
import { UserKakaoService } from '@account/user/domain/services/user-kakao.service';

@Module({
  imports: [KakaoModule, CqrsModule, DatabaseModule, JwtTokenModule],
  providers: [
    JwtAuthGuard,
    UserResolver,
    UserService,
    UserKakaoService,
    CreateUserHandler,
    LoginUserHandler,
    DeleteUserHandler,
    GetKakaoAuthUrlHandler,
    KakaoLoginHandler,
    {
      provide: UserRepositorySymbol,
      useClass: UserRepositoryImpl,
    },
    {
      provide: UserRoleRepositorySymbol,
      useClass: UserRoleRepositoryImpl,
    },
  ],
  exports: [UserResolver],
})
export class UserModule {}
