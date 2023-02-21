import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointments1676897926061 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
            name: 'appointments',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'provider',
                    type: 'varchar',
                    isNullable: false,

                },
                {
                    name: 'date',
                    type: 'timestamp with time zone',
                    isNullable: false,

                },
                {
                    name: 'client',
                    type: 'varchar',
                    isNullable: false,

                },
                {
                    name: 'service',
                    type: 'varchar',
                    isNullable: false,

                },
                {
                    name: 'advancePayment',
                    type: 'boolean',
                    isNullable: false,

                },
                {
                    name: 'price',
                    type: 'decimal',
                    isNullable: false,

                },
                {
                    name: 'advance_payment',
                    type: 'decimal',
                },
                {
                    name: 'remainder_payment',
                    type: 'decimal',
                    isNullable: false,
                },
                {
                    name: 'status',
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
    await queryRunner.dropTable('appointments')
}

}
