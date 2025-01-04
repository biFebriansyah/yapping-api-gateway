import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';

export const UserGrpcClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'users',
    protoPath: join(__dirname, '../_proto/users.proto'),
    url: process.env.GRPC_URL_USER || 'localhost:3002',
  },
};
