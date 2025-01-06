import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatGateway } from './chats.gateway';

@Module({
  controllers: [ChatsController],
  providers: [ChatGateway],
})
export class ChatsModule {}
