import {MigrationInterface, QueryRunner} from "typeorm";

export class user1617457882670 implements MigrationInterface {
    name = 'user1617457882670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "emailVerified" TO "isEmailVerified"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."isEmailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isEmailVerified" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isEmailVerified" SET DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."isEmailVerified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "isEmailVerified" TO "emailVerified"`);
    }

}
