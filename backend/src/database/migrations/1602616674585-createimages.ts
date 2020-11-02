import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createimages1602616674585 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'images',
            columns: [
                {
                    name:"id",
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated:true,
                    isNullable: false,
                    generationStrategy:'increment'
                },
                {
                    name: 'path',
                    type:'varchar'
                },
                {
                    name: 'orphanage_id',
                    type: 'integer'
                }
            ],
            foreignKeys:[
                {
                    name: 'ImageOrphanage',
                    columnNames: ['orphanage_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'orphanages',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images')
    }

}
