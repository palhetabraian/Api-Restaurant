// Responsavel por fazer as funcionalidades da rota (regra de negocio)
// controller responsavel por funcionalidades da rota
import { Request, Response, NextFunction } from 'express';

class TablesSessionsController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            return response.status(201).json();
        } catch (error) {
            next(error);
        }
    }
}
export { TablesSessionsController };
