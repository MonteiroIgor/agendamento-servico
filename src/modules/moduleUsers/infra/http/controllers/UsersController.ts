import ListAllUsersService from '../../../../moduleUsers/services/ListAllUsersService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../../../modules/moduleUsers/services/CreateUserService';

interface IRequest {
  provider_id?: string;
  email: string;
  password: string;
  user_name: string;
}

export default class UsersController {
  public async create(request: Request, reponse: Response): Promise<Response> {
    const { user_name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user: IRequest = await createUser.execute({
      email,
      password,
      user_name,
    });

    return reponse.json(user)
  }

  public async index(request: Request, response: Response): Promise<Response> {

    const listUsers = container.resolve(ListAllUsersService);

    const users = await listUsers.execute();

    return response.json(users);
  };
}
