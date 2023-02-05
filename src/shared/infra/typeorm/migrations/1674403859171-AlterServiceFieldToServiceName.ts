import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AlterServiceFieldToServiceName1612048043757 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'service');
    await queryRunner.addColumn('appointments', new TableColumn({
        name: 'service_id',
        type: 'uuid',
        isNullable: false,
      }),
  );

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
        name: 'ServicesProvider',
        columnNames: ['service_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'services',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'ServiceProvider');

    await queryRunner.dropColumn('appointments', 'service_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'service',
        type: 'varchar',
        isNullable: false,
      })
    )
  }

}
