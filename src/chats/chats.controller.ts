import {
  Controller,
  OnModuleInit,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Request,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { ChatService } from './chats.interface';
import { ChatGrpcClient } from './chats.grpc.client';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthGuard } from '../guard';
import { CreateChatDto, GetChatDto, GetParams, UpdateChatDto } from './chat.dto';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatsController implements OnModuleInit {
  @Client(ChatGrpcClient)
  private readonly chatClient: ClientGrpc;

  private chatService: ChatService;
  onModuleInit() {
    this.chatService = this.chatClient.getService<ChatService>('ChatService');
  }

  @Get('/all')
  async GetAll(): Promise<GetChatDto[]> {
    try {
      const observData = this.chatService.FatchAll({});
      const result = await firstValueFrom(observData);
      return result.chats;
    } catch (error) {
      throw error;
    }
  }

  @Get('/history/:receiverId')
  async GetChatHistory(@Param() params: GetParams, @Request() req: any): Promise<GetChatDto[]> {
    try {
      const observData = this.chatService.FatchChatHistory({
        userId: req.users.userId,
        receiverId: params.receiverId,
      });
      const result = await firstValueFrom(observData);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get('/:chatId')
  GetById(@Param() params: GetParams): Observable<GetChatDto> {
    try {
      const observData = this.chatService.FatchById({ chatId: params.chatId });
      return observData;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  GetChatUser(@Request() req: any): Observable<GetChatDto> {
    try {
      const observData = this.chatService.FatchById({ userId: req.users.userId });
      return observData;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  CreateChat(@Body() body: CreateChatDto): Observable<any> {
    try {
      const observData = this.chatService.CreateChat({ ...body });
      return observData;
    } catch (error) {
      throw error;
    }
  }

  @Put()
  UpdateChat(@Body() body: UpdateChatDto): Observable<any> {
    try {
      const observData = this.chatService.UpdateChat({ ...body });
      return observData;
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:chatId')
  DeleteChat(@Param() params: GetParams): Observable<any> {
    try {
      const observData = this.chatService.DeleteMessage({ chatId: params.chatId });
      return observData;
    } catch (error) {
      throw error;
    }
  }
}
