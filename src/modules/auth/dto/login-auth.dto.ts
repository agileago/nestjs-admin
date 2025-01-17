import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginAuthDto {
  @ApiProperty({ description: '用户名', required: true })
  @IsString({ message: 'account 类型错误，正确类型 string' })
  @IsNotEmpty({ message: 'account 不能为空' })
  @MinLength(5, { message: '账号至少6个字符' })
  @MaxLength(20, { message: '账号最多20个字符' })
  account: string

  @ApiProperty({ description: '密码', required: true })
  @IsNotEmpty()
  password: string
}
