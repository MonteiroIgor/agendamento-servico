import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';
import { celebrate, Joi, Segments } from 'celebrate';


const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);


profileRouter.put('/', celebrate({
  [Segments.BODY]: {
    user_name: Joi.string().required(),
    email: Joi.string().email().required,
    old_password: Joi.string(),
    password: Joi.when('old_password', {
      is: Joi.exist(),
      then: Joi.required(),
    }),
    password_confirmation: Joi.when('password', {
      is: Joi.exist(),
      then: Joi.valid(Joi.ref('password')).required(),
    }),
  },
}),profileController.update);
profileRouter.get('/', profileController.show);



export default profileRouter;
