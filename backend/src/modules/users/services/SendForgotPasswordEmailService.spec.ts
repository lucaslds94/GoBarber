import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '../../../shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let faketokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    faketokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      faketokensRepository,
    );
  });

  it('Should be able to recover a user password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Lucas Lima',
      email: 'lucas.lima@test.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'lucas.lima@test.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to recover a nonexistent user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'lucas.lima@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to generate a new forgot password token', async () => {
    const generateToken = jest.spyOn(faketokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Lucas Lima',
      email: 'lucas.lima@test.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'lucas.lima@test.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
