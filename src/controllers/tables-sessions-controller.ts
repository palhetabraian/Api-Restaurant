// Responsavel por fazer as funcionalidades da rota (regra de negocio)
// controller responsavel por funcionalidades da rota
import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';
//importando zod para validar os dados passado na requisicao
import { knex } from '@/database/knex';
import { z } from 'zod';

class TablesSessionsController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                table_id: z.number(),
            });

            // validando os dados passado pelo zod
            const { table_id } = bodySchema.parse(request.body);

            //Fazendo verificacao para nao deixar abrir uma mesa que ja esta aberta
            const session = await knex<TablesSessionsRepository>('tables_sessions')
                .where({
                    table_id,
                })
                .orderBy('opened_at', 'desc')
                .first();

            // Verificando se existe a mesa aberta
            if (session && !session.closed_at) {
                throw new AppError('this table is already open');
            }

            // inserindo dados na tabela de tables_sessions
            await knex<TablesSessionsRepository>('tables_sessions').insert({
                table_id,
                opened_at: knex.fn.now(),
            });

            return response.status(201).json();
        } catch (error) {
            next(error);
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const sessions = await knex<TablesSessionsRepository>('tables_sessions').orderBy('closed_at');

            return response.json(sessions);
        } catch (error) {
            next(error);
        }
    }
}
export { TablesSessionsController };
