import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProvider1676897589971 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
            name: 'provider',
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
                    name: 'phone',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'dtBirth',
                    type: 'Date',
                    isNullable: false,
                },
                {
                    name: 'cpf',
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
    await queryRunner.dropTable('provider')
}
}
