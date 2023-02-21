import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddfieldServiceNameInTableAppointments1676898181836 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'service_name',
      type: 'varchar',
      isNullable: false,
    }),
  );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'service_name');
  }


}
