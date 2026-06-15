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

    //metodo para listar os pedidos da mesa
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { table_session_id } = request.params;

            const order = await knex('orders')
                //conectando as tabelas
                .select(
                    'orders.id',
                    'orders.table_session_id',
                    'orders.product_id',
                    'products.name',
                    'orders.price',
                    'orders.quantity',
                    // comando sql para mostrar o total
                    knex.raw('(orders.price * orders.quantity) AS total'),
                    'orders.created_at',
                    'orders.updated_at'
                )
                .join('products', 'products.id', 'orders.product_id')
                .where({ table_session_id })
                .orderBy('orders.created_at', 'desc');

            return response.json(order);
        } catch (error) {
            next(error);
        }
    }

    // metodo responsavel por resumir o pedido

    async show(request: Request, response: Response, next: NextFunction) {
        try {
            const { table_session_id } = request.params;

            const order = await knex('orders')
                .select(knex.raw('COALESCE(SUM(orders.price * orders.quantity), 0) As total'))
                .select(knex.raw('COALESCE(SUM(orders.quantity), 0) As quantity'))
                .where({ table_session_id })
                .first();

            return response.json(order);
        } catch (error) {
            next(error);
        }
    }
}

export { OrdersController };
