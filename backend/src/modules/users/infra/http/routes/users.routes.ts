import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../../config/upload';

import UsersRepository from '../../typeorm/repositories/UsersRepository';
import CreateUserService from '../../../services/CreateUserService';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const usersReposiory = new UsersRepository();
  const createUser = new CreateUserService(usersReposiory);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  return res.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const usersReposiory = new UsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(usersReposiory);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    return res.json(user);
  },
);

export default usersRouter;
