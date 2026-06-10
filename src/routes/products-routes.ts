import { ProductsController } from '@/controllers/products-controller';
import { Router } from 'express';

const productsRoutes = Router();
const productsController = new ProductsController();

// Rota de lista produtos
productsRoutes.get('/', productsController.index);
//Rota responsavel por criar produtos
productsRoutes.post('/', productsController.create);

//Rota para atualizar
productsRoutes.put('/:id', productsController.update);

export { productsRoutes };
