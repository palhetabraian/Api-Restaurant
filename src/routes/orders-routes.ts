import { Router } from 'express';

import { OrdersController } from '@/controllers/orders-controllers';

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.post('/', ordersController.create);
ordersRoutes.get('/table-session/:id', ordersController.index);

export { ordersRoutes };
