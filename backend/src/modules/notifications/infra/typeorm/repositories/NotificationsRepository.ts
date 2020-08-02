import { getMongoRepository, MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';

import ICreateNotificationDTO from '../../../dtos/ICreateNotificationDTO';
import INotificationsRepository from '../../../repositories/INotificationsRepository';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      id: new ObjectID(),
      content,
      recipient_id,
    });

    this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
