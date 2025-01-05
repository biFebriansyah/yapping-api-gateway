import { Module, DynamicModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({})
export class JwtModules {
  static forRoot(): DynamicModule {
    return {
      imports: [
        JwtModule.register({
          global: true,
          privateKey: process.env.JWT_KEYS,
          signOptions: { expiresIn: '30m' },
        }),
      ],
      module: JwtModules,
    };
  }
}
