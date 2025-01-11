import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatGateway } from './chats.gateway';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: process.env.RABBIT_URL || 'amqp://localhost:5672',
      exchanges: [
        {
          name: 'exchange-chat',
          type: 'direct',
        },
      ],
    }),
  ],
  controllers: [ChatsController],
  providers: [ChatGateway],
})
export class ChatsModule {}
