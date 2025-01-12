import { Module, DynamicModule } from '@nestjs/common';
import { RabbitMQModule, RabbitHandlerConfig } from '@golevelup/nestjs-rabbitmq';

@Module({})
export class RabbitModule {
  static register(): DynamicModule {
    const rabbitModule = RabbitMQModule.forRoot(RabbitMQModule, {
      uri: process.env.RABBIT_URL || 'amqp://localhost:5672',
      exchanges: [
        {
          name: 'exchange-chat',
          type: 'direct',
        },
      ],
    });

    return {
      module: RabbitModule,
      imports: [rabbitModule],
      exports: [rabbitModule],
    };
  }
}

export const HandlerConfig: RabbitHandlerConfig = {
  type: 'subscribe',
  exchange: 'exchange-chat',
  routingKey: 'chat-routekey',
  queue: 'chat-queue',
};
