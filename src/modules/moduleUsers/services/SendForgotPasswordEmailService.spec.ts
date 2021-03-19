import AppError from '../../../shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '../../../shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../../moduleUsers/repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';


describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokensRepository = new FakeUserTokensRepository();


    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);

    await fakeUsersRepository.create({
      provider_id: '456454',
      user_name: 'John',
      email: 'john@mail.com',
      password: '123456'
    });

    await sendForgotPasswordEmail.execute({
      email: 'john@mail.com'
    });


    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () =>{
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokensRepository = new FakeUserTokensRepository();


    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);


    await expect(sendForgotPasswordEmail.execute({
      email: 'john@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should generate a forgot peassword token', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokensRepository = new FakeUserTokensRepository();

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);

   const user =  await fakeUsersRepository.create({
      provider_id: '456454',
      user_name: 'John',
      email: 'john@mail.com',
      password: '123456'
    });


    await sendForgotPasswordEmail.execute({
      email: 'john@mail.com',
      });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });

});

