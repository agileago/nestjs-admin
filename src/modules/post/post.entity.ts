import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseTenantEntity } from "../_base/baseTenant.entity";

@Entity("sys_post", { schema: "race_nestjs_admin" })
export class sys_post extends BaseTenantEntity {


  @Column("varchar", {
    name: "post_code",
    nullable: true,
    comment: "岗位编码",
    length: 100,
  })
  post_code: string | null;

  @Column("varchar", {
    name: "post_name",
    nullable: true,
    comment: "岗位名称",
    length: 100,
  })
  post_name: string | null;

  @Column("int", { name: "sort", nullable: true, comment: "排序" })
  sort: number | null;

  @Column("tinyint", {
    name: "status",
    nullable: true,
    comment: "状态  0：停用   1：正常",
  })
  status: number | null;
}
