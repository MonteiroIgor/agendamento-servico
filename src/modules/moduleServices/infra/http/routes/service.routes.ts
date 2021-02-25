import { Router } from 'express';
import ServiceRepository from '../../typeorm/repositories/ServiceRepository';
import CreateService from '../../../services/CreateServiceService';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';


const serviceRouter = Router();

// serviceRouter.get('/', async (request, response) => {
//   const serviceRepository = getCustomRepository(ServiceRepository);
//   const user = await serviceRepository.find();

//   return response.json(user);
// })



serviceRouter.post('/', async (request, response) => {
      const {
        name,
        description,
        price,
        date } = request.body;

      const serviceRepository = new ServiceRepository();


      const parsedDate = parseISO(date);

      const createService = container.resolve(CreateService);

      const user = await createService.execute({
        name,
        description,
        price,
        date: parsedDate,
      })
      return response.json(user);
});


export default serviceRouter;
