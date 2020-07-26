import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('Should be able to update users profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lucas Lima',
      email: 'lucas.lima@test.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Lucas',
      email: 'lucas@test.com',
    });

    expect(updatedUser.name).toBe('Lucas');
    expect(updatedUser.email).toBe('lucas@test.com');
  });

  it('Should not be able to update an account email with one that is already registered', async () => {
    await fakeUsersRepository.create({
      name: 'Lucas Lima',
      email: 'lucas.lima@test.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'SayMyName',
      email: 'walter.white@test.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Heisenberg',
        email: 'lucas.lima@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update users password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lucas Lima',
      email: 'lucas.lima@test.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Lucas',
      email: 'lucas@test.com',
      password: '123123',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('Should not be able to update users password without the old password input', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lucas Lima',
      email: 'lucas.lima@test.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Lucas',
        email: 'lucas@test.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update users password with wrong old password input', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lucas Lima',
      email: 'lucas.lima@test.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Lucas',
        email: 'lucas@test.com',
        password: '123123',
        old_password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
