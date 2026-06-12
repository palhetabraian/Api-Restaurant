import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';
import { knex } from '@/database/knex';
import { z } from 'zod';

class OrdersController {
    //responsavel pela regra de criar pedidos
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                table_session_id: z.number(),
                product_id: z.number(),
                quantity: z.number(),
            });

            const { table_session_id, product_id, quantity } = bodySchema.parse(request.body);

            const session = await knex<TablesSessionsRepository>('tables_sessions')
                .where({ id: table_session_id })
                .first();

            // verifica se nao tem sessao
            if (!session) {
                throw new AppError('session table not found');
            }
            // verificando se tem data de fechamento
            if (session.closed_at) {
                throw new AppError('this table is closed');
            }

            // verificando se o produto existe
            const product = await knex<ProductRepository>('products').where({ id: product_id }).first();

            // verificando se o produto nao existe
            if (!product) {
                throw new AppError('product not found');
            }

            // salvando o pedido na tabela
            await knex<OrderRepository>('orders').insert({
                table_session_id,
                product_id,
                quantity,
                price: product.price,
            });

            return response.status(201).json();
        } catch (error) {
            next(error);
        }
    }
}

export { OrdersController };
