import { Column, Entity, Index } from "typeorm";
import { BaseTenantEntity } from "../_base/baseTenant.entity";

@Index("idx_dept_id", ["dept_id"], {})
@Entity("sys_role", { schema: "race_nestjs_admin" })
export class RoleEntity extends BaseTenantEntity {

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "角色名称",
    length: 50,
  })
  name: string | null;

  @Column("varchar", {
    name: "remark",
    nullable: true,
    comment: "备注",
    length: 100,
  })
  remark: string | null;

  @Column("bigint", { name: "dept_id", nullable: true, comment: "部门ID" })
  dept_id: string | null;

}