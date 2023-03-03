import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from 'src/common/guards/jwt.strategy'
import config from '@/config'

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: config.jwt.secretkey,
        signOptions: {
          expiresIn: config.jwt.expiresin,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
