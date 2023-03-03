import { DeptModule } from './modules/dept/dept.module'
import { PostModule } from './modules/post/post.module'
import { TenantModule } from './modules/tenant/tenant.module'
import { MenuModule } from './modules/menu/menu.module'
import { AuthModule } from './modules/auth/auth.module'
import { RoleModule } from './modules/role/role.module'
import { UserModule } from './modules/user/user.module'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { AllExceptionsFilter } from './common/exception/all-exception.filter'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import config from '@/config'
import { join } from 'path'
import { TransformInterceptor } from '@/common/interceptor/transform.interceptor'

@Module({
  imports: [
    DeptModule,
    PostModule,
    TenantModule,
    MenuModule,
    AuthModule,
    RoleModule,
    UserModule,
    //配置typeorm
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        return {
          entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
          keepConnectionAlive: true,
          ...config.mysql,
        }
      },
    }),
    RedisModule.forRoot({
      config: config.redis,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
