import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import UserRepository from '../../typeorm/repositories/UserRepository';
import CreateUserService from '../../../services/CreateUserService';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProviderRepository from '../../../../moduleProviders/infra/typeorm/repositories/ProviderRepository';
import { container } from 'tsyringe';

const usersRouter = Router();

const upload = multer(uploadConfig);

interface User {
  provider_id: string,
  email: string,
  password?: string,
  user_name: string
}

// usersRouter.get('/', async (request, response) => {
//   const userRepository = getCustomRepository(UserRepository);
//   const user = await userRepository.find();

//   return response.json(user);
// })



usersRouter.post('/', async (request, response) => {
      const {
        provider_id,
        email,
        password,
        user_name } = request.body;


      const createUser = container.resolve(CreateUserService);

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

      const updateUserAvatar = container.resolve(UpdateUserAvatarService);

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      return response.json(user)

  },
);


export default usersRouter;
