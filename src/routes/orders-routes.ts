import { Router } from 'express';

import { OrdersController } from '@/controllers/orders-controllers';

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.post('/', ordersController.create);

export { ordersRoutes };
