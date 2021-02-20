import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

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
});


usersRouter.patch('/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      return response.json(user)

  },
);


export default usersRouter;
