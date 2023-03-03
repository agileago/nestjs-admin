import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from 'src/modules/user/user.service'
import config from '@/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.secretkey,
    })
  }

  async validate(payload: any) {
    const user = await this.userService.validateUserByJwt(payload)
    // 如果有用户信息，代表 token 没有过期，没有则 token 已失效
    if (!user) throw new UnauthorizedException()
    return user
  }
}
