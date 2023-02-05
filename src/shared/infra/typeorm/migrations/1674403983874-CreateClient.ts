import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateClient1674403983874 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
            name: 'client',
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
                    name: 'credit',
                    type: 'decimal',
                    isNullable: true,
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

