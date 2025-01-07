import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module';
import { SocketIOAdapter } from './utils/ioAdapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.useWebSocketAdapter(new SocketIOAdapter(app));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
