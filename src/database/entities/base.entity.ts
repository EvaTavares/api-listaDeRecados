import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
