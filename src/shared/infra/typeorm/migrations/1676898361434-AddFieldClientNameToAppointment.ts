import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddFieldClientNameToAppointment1676898361434 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'client_name',
      type: 'varchar',
      isNullable: false,
    }),
  );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'client_name');

  }

}
