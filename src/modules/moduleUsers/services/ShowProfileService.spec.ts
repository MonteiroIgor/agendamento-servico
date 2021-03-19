import AppError from '../../../shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('Show Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();


    showProfile = new ShowProfileService(fakeUsersRepository);

  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      provider_id: "456454",
      user_name: 'JohnBarber',
      email: 'johnbarber@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.user_name).toBe('JohnBarber');
    expect(profile.email).toBe('johnbarber@example.com');

  });

  it('should be able to show the profile', async () => {

    await expect(showProfile.execute({
      user_id: 'non-existing-user-id',
     })
    ).rejects.toBeInstanceOf(AppError);
  });


});
