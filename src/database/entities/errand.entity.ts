import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { StatusErrand } from "../../models/errand";
import { UserEntity } from "./user.entity";
import { BaseEntity } from "./base.entity";

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
