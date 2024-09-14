import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewFeidToPost1724059483830 implements MigrationInterface {
    name = 'AddNewFeidToPost1724059483830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`summary\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`summary\``);
    }

}
