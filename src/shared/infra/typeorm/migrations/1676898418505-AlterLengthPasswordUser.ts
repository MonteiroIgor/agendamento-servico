import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterLengthPasswordUser1676898418505 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'password');
    await queryRunner.addColumn('users', new TableColumn({
      name: 'password',
      type: 'varchar',
      isNullable: false,
      length: '12',
    }),
  );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'password');

  }

}
