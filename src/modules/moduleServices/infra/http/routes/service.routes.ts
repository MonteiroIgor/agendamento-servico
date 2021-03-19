import { Router } from 'express';
import ServicesController from '../controllers/ServicesController';


const serviceRouter = Router();
const servicesController = new ServicesController();


serviceRouter.post('/', servicesController.create);
serviceRouter.get('/', servicesController.index);


export default serviceRouter;
