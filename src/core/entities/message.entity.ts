import { UserEntity } from './user.entity';

export type MessageEntity = {
  id?: number;
  text: string;
  date: Date;
  userId: number;
  chatId: number;
  user?: UserEntity;
};
