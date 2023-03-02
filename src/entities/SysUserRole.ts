import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { sys_user } from './SysUser'
import { sys_role } from './SysRole'

@Index('idx_user_id', ['user_id'], {})
@Index('idx_role_id', ['role_id'], {})
@Entity('sys_user_role', { schema: 'race_nestjs_admin' })
export class sys_user_role {
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

  @Column('bigint', { name: 'role_id', nullable: true, comment: '角色ID' })
  role_id: string | null

  @Column('bigint', { name: 'user_id', nullable: true, comment: '用户ID' })
  user_id: string | null

  @ManyToOne(() => sys_user, sys_user => sys_user.sys_user_roles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    lazy: true,
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user_: Promise<sys_user>

  @ManyToOne(() => sys_role, sys_role => sys_role.sys_user_roles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    lazy: true,
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role_: Promise<sys_role>
}
