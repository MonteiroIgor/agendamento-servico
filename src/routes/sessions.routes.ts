import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import { getCustomRepository } from 'typeorm';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {

    const { user_name, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({
      user_name,
      password,
    })

      return response.json({ user, token });

});


export default sessionsRouter;
