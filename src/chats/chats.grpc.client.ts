import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';

export const ChatGrpcClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'chats',
    protoPath: join(__dirname, '../_proto/chat.proto'),
    url: process.env.GRPC_URL_CHAT || 'localhost:3003',
  },
};
