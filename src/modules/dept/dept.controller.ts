import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { Result } from 'src/common/utils/result'
import { Permissions } from 'src/common/decorator/permissions.decorator'
import { DeptService } from './dept.service'
import { CreateDeptDto } from './dto/create-dept.dto'
import { QueryDeptDto } from './dto/query-dept.dto'
import { UpdateDeptDto } from './dto/update-dept.dto'
import { RemoveDeptDto } from '@/modules/dept/dto/remove-dept.dto'
import { DeleteResult } from 'typeorm'

@ApiTags('部门相关')
@Controller('depts')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}
  @Get()
  @ApiOperation({ summary: '查询部门列表' })
  list(@Query() dto: QueryDeptDto) {
    return this.deptService.page(dto)
  }

  @Post('/create')
  @ApiOperation({ summary: '创建部门' })
  @Permissions('sys:dept:add')
  create(@Body() dto: CreateDeptDto) {
    return this.deptService.create(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询部门' })
  @ApiParam({ name: 'id', description: '部门id' })
  @Permissions('sys:dept:info')
  async query(@Param('id', new ParseIntPipe()) id): Promise<Result> {
    const res = await this.deptService.findById(id)
    return Result.ok(res)
  }

  @Post('/update')
  @ApiOperation({ summary: '更新部门' })
  async update(@Body() dto: UpdateDeptDto) {
    return this.deptService.updateById(dto)
  }

  @Post('/remove')
  @ApiOperation({ summary: '删除部门' })
  remove(@Body() dto: RemoveDeptDto): Promise<DeleteResult> {
    return this.deptService.deleteById(dto.id)
  }
}
