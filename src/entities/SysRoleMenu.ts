import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('idx_menu_id', ['menu_id'], {})
@Index('idx_role_id', ['role_id'], {})
@Entity('sys_role_menu', { schema: 'race_nestjs_admin' })
export class sys_role_menu {
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

  @Column('bigint', { name: 'menu_id', nullable: true, comment: '菜单ID' })
  menu_id: string | null
}
