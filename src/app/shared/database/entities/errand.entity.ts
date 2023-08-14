import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { UserEntity } from "./user.entity";
import { BaseEntity } from "./base.entity";
import { StatusErrand } from "../../../models/errand";

@Entity("errands")
export class ErrandEntity extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({
    enum: StatusErrand,
  })
  type!: string;

  @Column({ name: "id_user", type: "uuid" })
  idUser!: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "id_user" })
  user!: UserEntity;
}
