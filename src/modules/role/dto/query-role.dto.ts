import { ApiProperty } from '@nestjs/swagger'
import { BasePageDto } from 'src/modules/_base/basePage.dto'

export class QueryRoleDto extends BasePageDto {
  @ApiProperty({ description: '名称', required: false })
  name: string

  @ApiProperty({ description: '部门ID', required: false })
  dept_id: number

  @ApiProperty({ description: '备注', required: false })
  remark: string
}
