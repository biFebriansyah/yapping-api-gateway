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
  BadGatewayException,
  NotFoundException,
} from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { ChatService } from './chats.interface';
import { ChatGrpcClient } from './chats.grpc.client';
import { firstValueFrom, Observable, catchError, throwError } from 'rxjs';
import { AuthGuard } from '../guard';
import { status } from '@grpc/grpc-js';
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
      throw new BadGatewayException(error.details || '');
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
      return result.chats;
    } catch (error) {
      if (error?.code === status.NOT_FOUND) {
        throw new NotFoundException(error.details);
      }
      throw new BadGatewayException(error.details || '');
    }
  }

  @Get('/:chatId')
  GetById(@Param() params: GetParams): Observable<GetChatDto> {
    return this.chatService.FatchById({ chatId: params.chatId }).pipe(
      catchError((error) => {
        if (error?.code === status.NOT_FOUND) {
          return throwError(() => new NotFoundException(error.details));
        }
        return throwError(() => new BadGatewayException(error.details || ''));
      }),
    );
  }

  @Get()
  async GetChatUser(@Request() req: any): Promise<GetChatDto[]> {
    try {
      const observData = this.chatService.FatchUserChat({ userId: req.users.userId });
      const result = await firstValueFrom(observData);
      return result.chats;
    } catch (error) {
      if (error?.code === status.NOT_FOUND) {
        throw new NotFoundException(error.details);
      }
      throw new BadGatewayException(error.details || '');
    }
  }

  @Post()
  CreateChat(@Body() body: CreateChatDto): Observable<any> {
    try {
      const observData = this.chatService.CreateChat({ ...body });
      return observData;
    } catch (error) {
      throw new BadGatewayException(error.details || '');
    }
  }

  @Put()
  UpdateChat(@Body() body: UpdateChatDto): Observable<any> {
    try {
      const observData = this.chatService.UpdateChat({ ...body });
      return observData;
    } catch (error) {
      throw new BadGatewayException(error.details || '');
    }
  }

  @Delete('/:chatId')
  DeleteChat(@Param() params: GetParams): Observable<any> {
    try {
      const observData = this.chatService.DeleteMessage({ chatId: params.chatId });
      return observData;
    } catch (error) {
      throw new BadGatewayException(error.details || '');
    }
  }
}
