import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';
import { ZodError } from 'zod';

export function errorHandling(error: any, request: Request, response: Response, _: NextFunction) {
    // tratamento quando é uma classe instanciado pelo app erro quando o erro vem da aplicacao
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({ message: error.message });
    }

    //Criando tratacao quando é a partir dos dados enviados e verificando com o zod
    if (error instanceof ZodError) {
        return response.status(400).json({ message: 'validation error', issues: error.format() });
    }

    return response.status(500).json({ message: error.message });
}
