import { ApiProperty } from '@nestjs/swagger'
import { BasePageDto } from 'src/modules/_base/basePage.dto'

export class QueryDeptDto extends BasePageDto {
  @ApiProperty({ description: '名称', required: false })
  name: string
}
