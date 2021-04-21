import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserNews1618968676558 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_news",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "readed_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "user_id",
                        type: "varchar",
                    },
                    {
                        name: "news_id",
                        type: "varchar",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUser",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKNews",
                        referencedTableName: "news",
                        referencedColumnNames: ["id"],
                        columnNames: ["news_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
