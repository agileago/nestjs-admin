import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { Result } from 'src/common/utils/result'
import { CreateUserDto } from './dto/create-user.dto'
import { QueryUserDto } from './dto/query-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'
import { Permissions } from 'src/common/decorator/permissions.decorator'

@ApiTags('用户相关')
@Controller('users')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '查询用户列表' })
  @Permissions('sys:user:list')
  async list(@Query() dto: QueryUserDto): Promise<Result> {
    const res = await this.userService.page(dto)
    return Result.ok(res)
  }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @Permissions('sys:user:add')
  async create(@Body() dto: CreateUserDto): Promise<Result> {
    const res = await this.userService.create(dto)
    return Result.ok(res)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询用户' })
  @ApiParam({ name: 'id', description: '用户id' })
  @Permissions('sys:user:info')
  async query(@Param('id', new ParseIntPipe()) id): Promise<Result> {
    const res = await this.userService.find(id)
    return Result.ok(res)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户' })
  @ApiParam({ name: 'id', description: '用户id' })
  @Permissions('sys:user:update')
  async update(@Body() dto: UpdateUserDto): Promise<Result> {
    const res = await this.userService.updateById(dto)
    return Result.ok(res)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiParam({ name: 'id', description: '用户id' })
  @Permissions('sys:user:delete')
  async delete(@Param('id', new ParseIntPipe()) id): Promise<Result> {
    const res = await this.userService.deleteById(id)
    return Result.ok(res)
  }
}
