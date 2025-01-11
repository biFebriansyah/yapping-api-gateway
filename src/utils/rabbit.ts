import { Module, DynamicModule } from '@nestjs/common';
import { RabbitMQModule, RabbitHandlerConfig } from '@golevelup/nestjs-rabbitmq';

@Module({})
export class RabbitModule {
  static forFeature(): DynamicModule {
    return {
      module: RabbitModule,
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
      exports: [RabbitModule],
    };
  }
}

export const HandlerConfig: RabbitHandlerConfig = {
  type: 'subscribe',
  exchange: 'exchange-chat',
  routingKey: 'chat-routekey',
  queue: 'chat-queue',
};
