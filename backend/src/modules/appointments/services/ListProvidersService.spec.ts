// import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;

let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });
  it('Should be able to list all providers', async () => {
    await fakeUsersRepository.create({
      name: 'Lucas Lima',
      email: 'lucas.lima@test.com',
      password: '123456',
    });

    await fakeUsersRepository.create({
      name: 'Heisenberg',
      email: 'walter.white@test.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Pinkman',
      email: 'jesse.pinkman@test.com',
      password: '123456',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers.length).toBe(2);
  });
});
