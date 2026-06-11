import type { Knex } from 'knex';

// migration responsavel por criar as mesas do restaurante
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('tables', (table) => {
        // id autoincremento
        table.increments('id').primary();
        // integer para ser numero e nao aceitar null
        table.integer('table_number').notNullable();
        //para atualizar as datas que foram criadas e atualizadas.
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('tables');
}
