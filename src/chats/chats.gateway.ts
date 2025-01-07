import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { CreateChatDto } from './chat.dto';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { ChatService } from './chats.interface';
import { ChatGrpcClient } from './chats.grpc.client';

@WebSocketGateway(Number(process.env.WSPORT), { namespace: 'chat', cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnModuleInit {
  @Client(ChatGrpcClient)
  private readonly chatClient: ClientGrpc;

  @WebSocketServer()
  private server: Server;

  private chatService: ChatService;
  onModuleInit() {
    this.chatService = this.chatClient.getService<ChatService>('ChatService');
  }

  async handleConnection(socket: Socket) {
    try {
      const userId = socket['users'].userId;
      if (userId) {
        socket.join(userId);
      }
      console.log(`connected clientId: ${socket.id}\nuserId: ${userId}`);
    } catch (error) {
      throw error;
    }
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: CreateChatDto) {
    try {
      this.chatService.CreateChat({ ...message }).subscribe({});
      this.server.to(message.receiverId).emit('receive', message);
    } catch (error) {
      throw error;
    }
  }
}
