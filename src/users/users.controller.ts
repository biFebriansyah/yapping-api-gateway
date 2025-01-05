import {
  Controller,
  OnModuleInit,
  Get,
  Post,
  Put,
  Param,
  Body,
  BadGatewayException,
  HttpException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { UserService } from './users.interface';
import { UserGrpcClient } from './users.grpc.client';
import { Observable, firstValueFrom } from 'rxjs';
import { GetParams, CreateUserDto, UpdateUserDto, GetUserDto } from './users.dto';
import { AuthGuard } from '../guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController implements OnModuleInit {
  @Client(UserGrpcClient)
  private readonly userClient: ClientGrpc;

  private userService: UserService;

  onModuleInit() {
    this.userService = this.userClient.getService<UserService>('UserService');
  }

  @Get('/username/:username')
  GetByUsername(@Param() params: GetParams): Observable<GetUserDto> {
    try {
      return this.userService.FindByUsername({ username: params.username });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadGatewayException(error);
    }
  }

  @Get('/uid/:userId')
  GetById(@Param() params: GetParams): Observable<GetUserDto> {
    try {
      const observData = this.userService.FindById({ userId: params.userId });
      return observData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadGatewayException(error);
    }
  }

  @Get('/all')
  async GetAll(): Promise<GetUserDto[]> {
    try {
      const observData = this.userService.FetchAll({});
      const result = await firstValueFrom(observData);
      return result.users;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadGatewayException(error);
    }
  }

  @Get()
  async GetUser(@Request() req: any): Promise<any> {
    try {
      return this.userService.FindById({ userId: req.users?.userId });
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadGatewayException(error);
    }
  }

  @Post()
  CreateUser(@Body() body: CreateUserDto): Observable<any> {
    try {
      const observData = this.userService.CreateData({ ...body });
      return observData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadGatewayException(error);
    }
  }

  @Put()
  UpdateeUser(@Body() body: UpdateUserDto): Observable<any> {
    try {
      const observData = this.userService.UpdateData({ ...body });
      return observData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadGatewayException(error);
    }
  }
}
