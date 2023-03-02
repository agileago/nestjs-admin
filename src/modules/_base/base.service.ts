// BaseService.ts
import {
  DeleteResult,
  type FindOptionsWhere,
  type RemoveOptions,
  Repository,
  type SaveOptions,
} from 'typeorm'
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { Injectable } from '@nestjs/common'

/**
 * 服务基类,实现一些共有的基本方法,这样就不用每个服务类在写一遍了,直接继承该类即可
 */
@Injectable()
export class BaseService<T> {
  protected readonly repository: Repository<T>
  constructor(repository: Repository<T>) {
    this.repository = repository
  }

  async saveOne(entity: T, options?: SaveOptions): Promise<T> {
    return await this.repository.save(entity, options)
  }

  async saveMany(entities: T[], options?: SaveOptions): Promise<T[]> {
    return await this.repository.save(entities, options)
  }

  async findOne(options?: FindOptionsWhere<T>): Promise<T> {
    return await this.repository.findOne(options)
  }

  async findMany(options?: FindOptionsWhere<T>): Promise<T[]> {
    return await this.repository.find(options)
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find()
  }

  async removeOne(entity: T, options?: RemoveOptions): Promise<T> {
    return await this.repository.remove(entity, options)
  }

  async removeMany(entities: T[], options?: RemoveOptions): Promise<T[]> {
    return await this.repository.remove(entities, options)
  }

  async delete(options?: FindOptionsWhere<T>): Promise<DeleteResult> {
    return await this.repository.delete(options)
  }

  async update(
    conditions: number | FindOptionsWhere<T>,
    newValue: QueryDeepPartialEntity<T>,
  ): Promise<number> {
    let updateResult = 1
    await this.repository.update(conditions, newValue).catch(e => (updateResult = 0))
    return updateResult
  }
}
