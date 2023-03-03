import { IsNumber } from 'class-validator'

export class RemoveDeptDto {
  /**
   * 部门ID
   */
  @IsNumber({}, { message: 'id 类型错误，正确类型 number' })
  id: number
}
