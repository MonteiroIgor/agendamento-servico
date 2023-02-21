import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1676897834965 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false,
                    length: '6',
                },
                {
                    name: 'user_name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                }
            ]
        })

    )
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
}

}
