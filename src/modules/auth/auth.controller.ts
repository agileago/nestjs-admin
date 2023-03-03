import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { User } from 'src/common/decorator/user.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { Result } from 'src/common/utils/result'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { LoginAuthDto } from './dto/login-auth.dto'
import { UserEntity } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'

@ApiTags('登录注册')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiOkResponse({ type: UserEntity })
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user)
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() dto: LoginAuthDto): Promise<Result> {
    const res = await this.userService.login(dto.account, dto.password)
    return Result.ok(res)
  }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '我的用户信息' })
  async info(@User() user: UserEntity): Promise<Result> {
    return Result.ok(user)
  }
}
