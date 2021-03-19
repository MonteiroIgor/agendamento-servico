import AppError from '../../../shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('Update Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();


    updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);

  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      provider_id: "456454",
      user_name: 'JohnBarber',
      email: 'johnbarber@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      user_name: 'JohnOk',
      email: 'johnbarber@monckeybarber.com'
    });

    expect(updatedUser.user_name).toBe('JohnOk');
    expect(updatedUser.email).toBe('johnbarber@monckeybarber.com');
  });


  it('should be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      provider_id: "456454",
      user_name: 'JohnBarber',
      email: 'johnbarber@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      provider_id: "456454",
      user_name: 'Test',
      email: 'johnbarber@example.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      user_name: 'JohnOk',
      email: 'johnbarber@example.com'
    }),
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      provider_id: "456454",
      user_name: 'JohnBarber',
      email: 'johnbarber@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      user_name: 'JohnOk',
      email: 'johnbarber@monckeybarber.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');

  });

  it('should nopt be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      provider_id: "456454",
      user_name: 'JohnBarber',
      email: 'johnbarber@example.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      user_name: 'JohnOk',
      email: 'johnbarber@monckeybarber.com',
      password: '123123',
    })
    ).rejects.toBeInstanceOf(AppError);
  });


  it('should nopt be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      provider_id: "456454",
      user_name: 'JohnBarber',
      email: 'johnbarber@example.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      user_name: 'JohnOk',
      email: 'johnbarber@monckeybarber.com',
      old_password: 'wrong-old-password',
      password: '123123',
    })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to show the update profile', async () => {

    await expect(updateProfile.execute({
      user_id: 'non-existing-user-id',
      user_name: 'test',
      email: 'test@xample.com'
     })
    ).rejects.toBeInstanceOf(AppError);
  });

});
