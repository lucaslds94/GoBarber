import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('Create user', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('Should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Lucas Lima',
      email: 'lucas.lima@test.com',
      password: '12345678',
    });

    expect(user).toHaveProperty('id');
  });
  it('Should not be able to create a new user that already exists', async () => {
    await createUserService.execute({
      name: 'Lucas Lima',
      email: 'lucas.lima@test.com',
      password: '12345678',
    });

    await expect(
      createUserService.execute({
        name: 'Lucas Lima',
        email: 'lucas.lima@test.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
