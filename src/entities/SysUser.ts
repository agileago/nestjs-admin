import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { sys_dept } from './SysDept'
import { sys_user_post } from './SysUserPost'
import { sys_user_role } from './SysUserRole'

@Index('IDX_9e7164b2f1ea1348bc0eb0a7da', ['username'], { unique: true })
@Index('idx_create_date', ['created_at'], {})
@Entity('sys_user', { schema: 'race_nestjs_admin' })
export class sys_user {
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

  @Column('varchar', {
    name: 'username',
    unique: true,
    comment: '用户名',
    length: 50,
  })
  username: string

  @Column('varchar', {
    name: 'password',
    nullable: true,
    comment: '密码',
    length: 100,
  })
  password: string | null

  @Column('varchar', {
    name: 'real_name',
    nullable: true,
    comment: '姓名',
    length: 50,
  })
  real_name: string | null

  @Column('varchar', {
    name: 'head_url',
    nullable: true,
    comment: '头像',
    length: 200,
  })
  head_url: string | null

  @Column('tinyint', {
    name: 'gender',
    nullable: true,
    comment: '性别   0：男   1：女    2：保密',
    unsigned: true,
  })
  gender: number | null

  @Column('varchar', {
    name: 'email',
    nullable: true,
    comment: '邮箱',
    length: 100,
  })
  email: string | null

  @Column('varchar', {
    name: 'mobile',
    nullable: true,
    comment: '手机号',
    length: 100,
  })
  mobile: string | null

  @Column('tinyint', {
    name: 'super_admin',
    nullable: true,
    comment: '超级管理员   0：否   1：是',
    unsigned: true,
  })
  super_admin: number | null

  @Column('tinyint', {
    name: 'super_tenant',
    nullable: true,
    comment: '租户管理员   0：否   1：是',
    unsigned: true,
  })
  super_tenant: number | null

  @Column('tinyint', {
    name: 'status',
    nullable: true,
    comment: '状态  0：停用   1：正常',
  })
  status: number | null

  @Column('varchar', {
    name: 'salt',
    nullable: true,
    comment: '密码加盐',
    length: 100,
  })
  salt: string | null

  @OneToOne(() => sys_dept, sys_dept => sys_dept.sys_user, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    lazy: true,
  })
  @JoinColumn([{ name: 'dept_id', referencedColumnName: 'id' }])
  dept_: Promise<sys_dept>

  @OneToMany(() => sys_user_post, sys_user_post => sys_user_post.user_, {
    lazy: true,
  })
  sys_user_posts: Promise<sys_user_post[]>

  @OneToMany(() => sys_user_role, sys_user_role => sys_user_role.user_, {
    lazy: true,
  })
  sys_user_roles: Promise<sys_user_role[]>
}
