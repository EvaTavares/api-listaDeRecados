import { Column, Entity, PrimaryColumn } from "typeorm";
import { StatusErrand } from "../../models/errand";

@Entity("errand")
export class ErrandEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({
    enum: StatusErrand,
  })
  type!: string;

  @Column({ name: "id_user" })
  idUser!: string;

  @Column({ name: "dthr_criacao" })
  dthrCriacao!: Date;

  @Column({ name: "dthr_atualizacao" })
  dthrAtualizacao!: Date;
}
