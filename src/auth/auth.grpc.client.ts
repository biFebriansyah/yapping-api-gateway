import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';

export const AuthGrpcClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'auth',
    protoPath: join(__dirname, '../_proto/auth.proto'),
    url: process.env.GRPC_URL_AUTH || 'localhost:3003',
  },
};
