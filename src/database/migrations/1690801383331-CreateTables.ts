import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1690801383331 implements MigrationInterface {
    name = 'CreateTables1690801383331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "listaderecados"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "listaderecados"."errands" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "id_user" uuid NOT NULL, CONSTRAINT "PK_e662df04e22a376f6538dc55690" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "listaderecados"."errands" ADD CONSTRAINT "FK_19f7b7d8bee8381e086980e4081" FOREIGN KEY ("id_user") REFERENCES "listaderecados"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listaderecados"."errands" DROP CONSTRAINT "FK_19f7b7d8bee8381e086980e4081"`);
        await queryRunner.query(`DROP TABLE "listaderecados"."errands"`);
        await queryRunner.query(`DROP TABLE "listaderecados"."users"`);
    }

}
