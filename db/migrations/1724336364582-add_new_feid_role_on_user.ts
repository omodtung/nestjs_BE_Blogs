import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewFeidRoleOnUser1724336364582 implements MigrationInterface {
    name = 'AddNewFeidRoleOnUser1724336364582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` varchar(255) NOT NULL DEFAULT 'User'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
    }

}
