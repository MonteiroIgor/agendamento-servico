import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

interface User {
  provider_id: string,
  email: string,
  password?: string,
  user_name: string
}

usersRouter.get('/', async (request, response) => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.find();

  return response.json(user);
})



usersRouter.post('/', async (request, response) => {
    try {
      const {
        provider_id,
        email,
        password,
        user_name } = request.body;

      const createUser = new CreateUserService();

      const user: User = await createUser.execute({
        provider_id,
        email,
        password,
        user_name
      })


      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
});


export default usersRouter;
