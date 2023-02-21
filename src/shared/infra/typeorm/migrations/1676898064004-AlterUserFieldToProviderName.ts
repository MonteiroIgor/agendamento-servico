import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AlterUserFieldToProviderName1676898064004 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'name');
    await queryRunner.addColumn('users', new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: false,
      }),
  );

    await queryRunner.createForeignKey('users', new TableForeignKey({
        name: 'UsersProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'provider',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'UsersProvider');

    await queryRunner.dropColumn('users', 'provider_id');

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: false,
      })
    )
  }

}
