import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;

let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('Should be able to show users profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lucas Lima',
      email: 'lucas.lima@test.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Lucas Lima');
    expect(profile.email).toBe('lucas.lima@test.com');
  });

  it('Should not be able to show a unexistent profile', async () => {
    await expect(
      showProfile.execute({
        user_id: 'unexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
