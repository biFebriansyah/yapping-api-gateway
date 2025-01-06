import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatsController } from './chats/chats.controller';
import { JwtModules } from './utils/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModules.forRoot(),
    AuthModule,
    UsersModule,
    ChatsController,
  ],
})
export class AppModule {}
