import { Column, Entity, OneToMany } from "typeorm";
import { ErrandEntity } from "./errand.entity";
import { BaseEntity } from "./base.entity";

@Entity("users")
export class UserEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}
