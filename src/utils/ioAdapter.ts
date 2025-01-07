import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';

type WsMiddlware = (socket: Socket, next: (err?: Error) => void) => void;

export class SocketIOAdapter extends IoAdapter {
  constructor(private app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: any) {
    const server: Server = super.createIOServer(port, options);
    const jwt: JwtService = this.app.get(JwtService);
    server.of('chat').use(this.AuthorizationWS(jwt));
    return server;
  }

  private AuthorizationWS(jwt: JwtService): WsMiddlware {
    return async (socket, next) => {
      const token = this.extractTokenFromHeader(socket);
      if (!token) {
        return next(new WsException('UNAUTORIZE'));
      }

      try {
        const payload = await jwt.verifyAsync(token, { secret: process.env.JWT_KEYS });
        socket['users'] = payload;
        next();
      } catch (error) {
        next(new WsException('FORBIDDEN'));
      }
    };
  }

  private extractTokenFromHeader(request: Socket): string | undefined {
    const [type, token] = request.handshake.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
