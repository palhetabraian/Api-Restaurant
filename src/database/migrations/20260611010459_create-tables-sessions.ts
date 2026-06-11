import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('table_sessions', (table) => {
        table.increments('id').primary();
        /**  Fazendo a conexao das seguintes colunas e vamos usar referencia.
         *  é o id que existe na tabela tables
         */
        table.integer('table_id').notNullable().references('id').inTable('tables');
        table.timestamp('oponed_at').defaultTo(knex.fn.now());
        table.timestamp('closed_at');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('table_sessions');
}
