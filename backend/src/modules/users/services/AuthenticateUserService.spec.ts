import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('Authenticate user', () => {
  it('Should be able to authenticate a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Lucas Lima',
      email: 'lucas.lima@test.com',
      password: '12345678',
    });

    const response = await authenticateUser.execute({
      email: 'lucas.lima@test.com',
      password: '12345678',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('Should not be able to authenticate with an invalid password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Lucas Lima',
      email: 'lucas.lima@test.com',
      password: '12345678',
    });

    await expect(
      authenticateUser.execute({
        email: 'lucas.lima@test.com',
        password: 'invalidpass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with a nonexistent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await expect(
      authenticateUser.execute({
        email: 'nonexistent.user@test.com',
        password: '1234567546548',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
