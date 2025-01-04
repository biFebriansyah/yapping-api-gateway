import { Controller, OnModuleInit, Post, Body } from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.interface';
import { AuthGrpcClient } from './auth.grpc.client';
import { SignInAuthDto, SignUpAuthDto, TokenAuthDto } from './auth.dto';

@Controller('auth')
export class AuthController implements OnModuleInit {
  @Client(AuthGrpcClient)
  private readonly authClient: ClientGrpc;

  private authService: AuthService;

  onModuleInit() {
    this.authService = this.authClient.getService<AuthService>('AuthService');
  }

  @Post('/signup')
  async SignupUser(@Body() body: SignUpAuthDto): Promise<any> {
    try {
      const signUpObserv = this.authService.SignUp(body);
      const result = await firstValueFrom(signUpObserv);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @Post('/signin')
  async SigninUser(@Body() body: SignInAuthDto): Promise<TokenAuthDto> {
    try {
      const signInObserv = this.authService.SignIn(body);
      const result = await firstValueFrom(signInObserv);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
