// Responsavel por fazer as funcionalidades da rota (regra de negocio)
import { Request, Response, NextFunction } from 'express';

//arquivo de conexao com o banco de dados
import { knex } from '@/database/knex';

// Criando uma classe para instanciar as funcionalidades da rota
class TablesController {
    //funcionalidade de listar as mesas(tables)
    async index(resquest: Request, response: Response, next: NextFunction) {
        try {
            // selecionando as mesas na tabela
            const tables = await knex<TableRepository>('tables').select().orderBy('table_number');

            return response.json(tables);
        } catch (error) {
            next(error);
        }
    }
}

export { TablesController };
