import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class UpdateMenuDto {
  @ApiProperty({ description: 'id' })
  @IsNumber({}, { message: 'id 类型错误，正确类型 number' })
  @IsNotEmpty({ message: 'id 不能为空' })
  id: number
}
