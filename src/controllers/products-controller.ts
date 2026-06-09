import { NextFunction, Request, Response } from 'express';

// Metodos do nosso controller
class ProductsController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            return response.json({ message: 'ok' });
        } catch (error) {
            next(error);
        }
    }
}

export { ProductsController };
