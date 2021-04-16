import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ServicesController from '../controllers/ServicesController';


const serviceRouter = Router();
const servicesController = new ServicesController();


serviceRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    date: Joi.date(),
  }
}),servicesController.create);
serviceRouter.get('/', servicesController.index);


export default serviceRouter;
