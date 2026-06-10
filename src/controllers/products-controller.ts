import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

// Metodos do nosso controller
class ProductsController {
    // Controler responsavel por listar os produtos
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            return response.json({ message: 'ok' });
        } catch (error) {
            next(error);
        }
    }

    //controller responsavel por adicionar produto
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            // Fazendo a validacao com zod
            const bodySchema = z.object({
                // trim serve para tirar os espacos e min para no minimo 6 digitos
                name: z.string().trim().min(6),
                // gt pelo menos maior que 0 o preco do produto
                price: z.number().gt(0, { message: 'value must be greater than 0' }),
            });

            const { name, price } = bodySchema.parse(request.body);

            // status 201 criado com sucesso.
            return response.status(201).json({ name, price });
        } catch (error) {
            next(error);
        }
    }
}

export { ProductsController };
