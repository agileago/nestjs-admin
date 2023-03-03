import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import config from '@/config'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user
    // 当前请求所需权限
    const currentPerm = this.reflector.get<string>('permissions', context.getHandler())
    Logger.log(currentPerm, '当前所需权限:')
    // 标识不需要权限
    if (!currentPerm) {
      return true
    }
    if (config.permissions.close) {
      Logger.warn('当前角色权限校验【已关闭】')
    } else {
      Logger.log('当前角色权限校验【已开启】')
    }
    return true
  }
}
