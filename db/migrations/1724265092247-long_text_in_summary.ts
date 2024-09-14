import { MigrationInterface, QueryRunner } from "typeorm";

export class LongTextInSummary1724265092247 implements MigrationInterface {
    name = 'LongTextInSummary1724265092247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`summary\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`summary\` longtext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`summary\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`summary\` varchar(255) NOT NULL`);
    }

}
