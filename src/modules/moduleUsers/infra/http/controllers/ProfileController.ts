import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '../../../../../modules/moduleUsers/services/UpdateProfileService';
import ShowProfileService from '../../../../../modules/moduleUsers/services/ShowProfileService';

interface IRequest {
  provider_id: string;
  email: string;
  password: string;
  user_name: string;
}

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response>{
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    delete user.password;

    return response.json(user);
  }


  public async update(request: Request, reponse: Response): Promise<Response> {
    const user_id = request.user.id;
    const { user_name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user: IRequest = await updateProfile.execute({
      user_id,
      email,
      password,
      old_password,
      user_name,
    });

    return reponse.json(user)
  }
}
