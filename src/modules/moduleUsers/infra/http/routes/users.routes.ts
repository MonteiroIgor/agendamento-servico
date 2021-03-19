import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { container } from 'tsyringe';
import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UsersAvatarController';


const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

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



usersRouter.post('/', usersController.create);


usersRouter.patch('/avatar',
  ensureAuthenticated,
  upload.single('avatar'), usersAvatarController.update,
);


export default usersRouter;
