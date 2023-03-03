import { UserService } from './user.service'
import { UserController } from './user.controller'
import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { JwtModule } from '@nestjs/jwt'
import config from '@/config'

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: config.jwt.secretkey,
        signOptions: {
          expiresIn: config.jwt.expiresin,
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
