import { Column, Entity, Index, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { sys_user } from './SysUser'

@Index('idx_sort', ['sort'], {})
@Index('idx_pid', ['pid'], {})
@Entity('sys_dept', { schema: 'race_nestjs_admin' })
export class sys_dept {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', comment: 'id' })
  id: string

  @Column('bigint', { name: 'creator', nullable: true, comment: '创建者' })
  creator: string | null

  @Column('datetime', {
    name: 'created_at',
    comment: '创建时间',
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  created_at: Date

  @Column('bigint', { name: 'updater', nullable: true, comment: '更新者' })
  updater: string | null

  @Column('datetime', {
    name: 'updated_at',
    comment: '更新时间',
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  updated_at: Date

  @Column('datetime', { name: 'deleted_at', nullable: true, comment: '删除' })
  deleted_at: Date | null

  @Column('bigint', {
    name: 'tenant_code',
    nullable: true,
    comment: '租户编码',
  })
  tenant_code: string | null

  @Column('bigint', { name: 'pid', nullable: true, comment: '上级ID' })
  pid: string | null

  @Column('varchar', {
    name: 'pids',
    nullable: true,
    comment: '所有上级ID，用逗号分开',
    length: 500,
  })
  pids: string | null

  @Column('varchar', {
    name: 'name',
    nullable: true,
    comment: '部门名称',
    length: 50,
  })
  name: string | null

  @Column('int', {
    name: 'sort',
    nullable: true,
    comment: '排序',
    unsigned: true,
  })
  sort: number | null

  @OneToOne(() => sys_user, sys_user => sys_user.dept_, { lazy: true })
  sys_user: Promise<sys_user>
}
