import { NextFunction, Request, Response } from 'express';
import { knex } from '@/database/knex.js';
import { z } from 'zod';

// Metodos do nosso controller
class ProductsController {
    // Controler responsavel por listar os produtos cadastrados
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            // Fazendo pesquisa pelo queryparamter(parametros opcional)
            const { name } = request.query;

            /**
             * Usando o select() do propio knex para pegar os produtos da tabela com knex
             * e jogando na variavel products
             */
            const products = await knex<ProductRepository>('products')
                .select()
                .whereLike('name', `%${name ?? ''}%`)
                .orderBy('name');

            return response.json(products);
        } catch (error) {
            next(error);
        }
    }

    //controller responsavel por adicionar produto
    // Nossa Rota de Create
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            // Fazendo a validacao com zod
            const bodySchema = z.object({
                // trim serve para tirar os espacos e min para no minimo 6 digitos
                name: z.string().trim().min(6),
                // gt pelo menos maior que 0 o preco do produto
                price: z.number().gt(0, { message: 'value must be greater than 0' }),
            });

            // parse é um metodo do Zod que valida os dados de acordo com o schema criado
            // se o bodyschema bater com o request.body ele vai validar!
            // parse pega os dados do request.body e se for igual ele passa
            const { name, price } = bodySchema.parse(request.body);

            //Adicionando produto no banco com knex
            // passando a tipagem para os dados que vao ser inseridos na tabela
            // usando o generic <> e passando ProductRepository
            await knex<ProductRepository>('products').insert({ name, price });

            // status 201 criado com sucesso.
            return response.status(201).json();
        } catch (error) {
            next(error);
        }
    }
}

export { ProductsController };
