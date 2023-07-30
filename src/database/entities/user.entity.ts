import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ErrandEntity } from "./errand.entity";
import { BaseEntity } from "./base.entity";

@Entity("user")
export class UserEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => ErrandEntity, (errand) => errand.user)
  errands!: ErrandEntity[];
}
