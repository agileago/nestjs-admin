import { ApiProperty } from '@nestjs/swagger'
import { BasePageDto } from 'src/modules/_base/basePage.dto'

export class QueryPostDto extends BasePageDto {
  @ApiProperty({ description: '名称', required: false })
  post_name: string
}
