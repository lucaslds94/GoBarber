import ICreateNotificationDTO from '../../dtos/ICreateNotificationDTO';
import INotificationsRepository from '../INotificationsRepository';

import Notification from '../../infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { content, recipient_id });

    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;
