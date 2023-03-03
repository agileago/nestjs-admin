import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreatePostDto {
  @ApiProperty({ description: '名称', required: true })
  @IsString()
  post_name: string

  @ApiProperty({ description: ' 编码', required: true })
  @IsString()
  post_code: string
}
