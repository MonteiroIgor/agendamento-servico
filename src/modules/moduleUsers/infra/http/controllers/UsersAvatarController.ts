import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '../../../../moduleUsers/services/UpdateUserAvatarService';



export default class UsersAvatarController {
  public async update(request: Request, reponse: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

    return reponse.json(classToClass(user))
  }
}
