import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Seed responsavel para deletar os registro da tabela
    await knex('tables').del();

    // Seed responsavel para inserir dados na tabela
    await knex('tables').insert([
        { table_number: 1 },
        { table_number: 2 },
        { table_number: 3 },
        { table_number: 4 },
        { table_number: 5 },
    ]);
}
