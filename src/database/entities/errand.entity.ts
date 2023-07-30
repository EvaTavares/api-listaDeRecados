import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Errand, StatusErrand } from "../../models/errand";
import { UserEntity } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Entity("errand")
export class ErrandEntity extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({
    enum: StatusErrand,
  })
  type!: StatusErrand;

  @Column({ name: "id_user", type: "uuid" })
  idUser!: string;

  @ManyToOne(() => UserEntity, (entity) => entity.errands)
  @JoinColumn({ name: "id_user", referencedColumnName: "id" })
  user!: UserEntity;
}
