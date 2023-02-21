import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import AuthenticateUserService from '../../../services/AuthenticateUserService';


export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_name, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUserService.execute({
      user_name,
      password,
    })

      return response.json({ user: instanceToInstance(user), token });
  }
}
