import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { instanceToPlain, plainToClass } from 'class-transformer'
import { Repository } from 'typeorm'
import { CreateMenuDto } from './dto/create-menu.dto'
import { QueryMenuDto } from './dto/query-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { MenuEntity } from './menu.entity'

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepo: Repository<MenuEntity>,
  ) {}

  // 创建
  async create(dto: CreateMenuDto): Promise<Record<string, any>> {
    const data = plainToClass(MenuEntity, dto, { ignoreDecorators: true })
    const res = await this.menuRepo.save(data)
    return res
  }

  // 分页列表查找
  async page(dto: QueryMenuDto): Promise<Record<string, any>> {
    const { page = 1, size = 10 } = dto
    const where = {
      // ...(name ? { name: Like(`%${name}%`) } : null),
    }
    const [result, total] = await this.menuRepo.findAndCount({
      where,
      order: { created_at: 'DESC' },
      skip: size * (page - 1),
      take: size,
    })
    return {
      list: instanceToPlain(result),
      page: page,
      size: size,
      count: total,
    }
  }

  // 根据ID查找
  async findById(id: number): Promise<Record<string, any>> {
    const findOne = await this.menuRepo.findOne({ where: { id } })
    if (!findOne) {
      throw new NotFoundException()
    }
    return instanceToPlain(findOne)
  }

  // 根据ID更新
  async updateById(dto: UpdateMenuDto): Promise<Record<string, any>> {
    await this.findById(dto.id)
    await this.menuRepo.update(dto.id, dto)
    return instanceToPlain(await this.findById(dto.id))
  }

  // 根据ID删除
  async deleteById(id: number): Promise<Record<string, any>> {
    await this.findById(id)
    const res = await this.menuRepo.softDelete(id)
    return res
  }
}
