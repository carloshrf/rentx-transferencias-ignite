import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class addTransferInStatements1625766955710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.changeColumn('statements', 'type', 
        new TableColumn(
          {
            name: 'type',
            type: 'enum',
            enum: ['deposit', 'withdraw', 'transfer']
          }
        )
      );

      await queryRunner.addColumn('statements', 
        new TableColumn(
          {
            name: 'receiver_id',
            type: 'uuid',
            isNullable: true
          }
        )
      );

      await queryRunner.createForeignKey('statements', 
        new TableForeignKey(
          {
            name: 'FKTransferReceiver',
            columnNames: ['receiver_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          }
        )
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.changeColumn('statements', 'type', 
        new TableColumn(
          {
            name: 'type',
            type: 'enum',
            enum: ['deposit', 'withdraw']
          }
        )
      );

      await queryRunner.dropForeignKey('statements', 'FKTransferReceiver');

      await queryRunner.dropColumn('statements', 'receiver_id');
    }

}
