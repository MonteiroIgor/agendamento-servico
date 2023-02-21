import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AlterClientFieldToClientId1676898315722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'client');
    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'client_id',
      type: 'uuid',
      isNullable: false,
    }),
  );
    await  queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'ApponitmentClient',
      columnNames: ['client_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'client',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }))

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentClient');

    await queryRunner.dropColumn('appointments', 'client_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'client',
        type: 'varchar',
        isNullable: false,
      })
    )
  }

}
