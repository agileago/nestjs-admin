import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class UpdateRoleDto {
  @ApiProperty({ description: 'id' })
  @IsNumber({}, { message: 'id 类型错误，正确类型 number' })
  @IsNotEmpty({ message: 'id 不能为空' })
  id: number

  @ApiProperty({ description: '名称', required: false })
  @IsString()
  name: string

  @ApiProperty({ description: '部门ID', required: false })
  dept_id: number

  @ApiProperty({ description: '备注', required: false })
  @IsString()
  remark: string
}
