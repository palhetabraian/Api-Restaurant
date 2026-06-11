// Responsavel por fazer as funcionalidades da rota (regra de negocio)
// controller responsavel por funcionalidades da rota
import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';
//importando zod para validar os dados passado na requisicao
import { knex } from '@/database/knex';
import { z } from 'zod';

class TablesSessionsController {
    // metodo para criar as sessoes da mesa
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

    // metodo para listar todas as sessoes de mesa
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const sessions = await knex<TablesSessionsRepository>('tables_sessions').orderBy('closed_at');

            return response.json(sessions);
        } catch (error) {
            next(error);
        }
    }

    // metodo para finalizar a sessao de uma mesa

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            // validando o id e refinando para ser um numero
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: 'id must be a number' })
                .parse(request.params.id);

            //Fechando a Mesa
            const session = await knex<TablesSessionsRepository>('tables_sessions').where({ id }).first();

            if (!session) {
                throw new AppError('session table not found');
            }

            if (session.closed_at) {
                throw new AppError('this session table is already closed');
            }

            await knex<TablesSessionsRepository>('tables_sessions').update({ closed_at: knex.fn.now() }).where({ id });

            return response.json();
        } catch (error) {
            next(error);
        }
    }
}
export { TablesSessionsController };
