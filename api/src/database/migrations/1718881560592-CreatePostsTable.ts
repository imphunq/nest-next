import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePostsTable1718881560592 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'posts',
				columns: [
						{
							name: 'id',
							type: 'int',
							isPrimary: true,	
						},
						{
							name: 'title',
							type: 'varchar',
						},
						{
							name: 'content',
							type: 'varchar'
						}
				],
			}),
			true,
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('posts')
	}

}
