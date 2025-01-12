import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatGateway } from './chats.gateway';
import { RabbitModule } from '../utils/rabbit';

@Module({
  imports: [RabbitModule.register()],
  controllers: [ChatsController],
  providers: [ChatGateway],
})
export class ChatsModule {}
