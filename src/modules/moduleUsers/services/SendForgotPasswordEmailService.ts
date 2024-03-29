import AppError from '../../../shared/errors/AppError';
import path from 'path';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from "tsyringe";
import IMailProvider from '../../../shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';


interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    ){}

  public async execute( { email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists.");
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: user.user_name,
        email: user.email,
      },
      subject: '[MonckeyBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.user_name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        }
      }

    });
  }
}

export default SendForgotPasswordEmailService;
