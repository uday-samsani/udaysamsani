import {MigrationInterface, QueryRunner} from "typeorm";

export class user1617467908619 implements MigrationInterface {
    name = 'user1617467908619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blog_post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "coverImage" character varying NOT NULL, "body" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_694e842ad1c2b33f5939de6fede" PRIMARY KEY ("id"))`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."isEmailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isEmailVerified" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isEmailVerified" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."isEmailVerified" IS NULL`);
        await queryRunner.query(`DROP TABLE "blog_post"`);
    }

}
