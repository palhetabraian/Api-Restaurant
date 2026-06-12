import type { Knex } from 'knex';

// migration respoonsavel por criar tabelas de orders(pedidos)
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('orders', (table) => {
        (table.increments('id').primary(),
            // fazendo conexao com a tabela tables_sessions
            table.integer('table_session_id').notNullable().references('id').inTable('tables_sessions'));
        table.integer('product_id').notNullable().references('id').inTable('products');

        //quantidade de pedidos
        table.integer('quantity').notNullable();
        table.decimal('price').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('orders');
}
