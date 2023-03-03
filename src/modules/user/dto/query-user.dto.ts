import { ApiProperty } from '@nestjs/swagger'
import { BasePageDto } from 'src/modules/_base/basePage.dto'

export class QueryUserDto extends BasePageDto {
  @ApiProperty({ description: '用户名', required: false })
  username: string

  @ApiProperty({ description: '状态', required: false })
  status: number

  @ApiProperty({ description: '性别', required: false })
  gender: number
}
