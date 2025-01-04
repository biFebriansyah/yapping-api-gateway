import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';

export const UserGrpcClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'auth',
    protoPath: join(__dirname, '../_proto/auth.proto'),
    url: 'localhost:3003',
  },
};
