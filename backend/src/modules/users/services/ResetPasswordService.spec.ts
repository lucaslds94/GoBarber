import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to reset a password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lucas Lima',
      email: 'lucas.lima@test.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({ password: '12345678', token });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('12345678');
    expect(generateHash).toHaveBeenCalledWith('12345678');
  });

  it('Should not be able to reset the password with a nonexistent token ', async () => {
    await expect(
      resetPassword.execute({
        password: '123123',
        token: 'nonexistent-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password with a nonexistent user ', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'nonexistent-token',
    );

    await expect(
      resetPassword.execute({ token, password: '4254454' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password if the token is expired(2h) ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Lucas Lima',
      email: 'lucas.lima@test.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({ token, password: '123456' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
