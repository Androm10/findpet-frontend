import { MessageEntity } from './message.entity';
import { UserEntity } from './user.entity';

export type ChatEntity = {
  id: number;
  users: UserEntity[];
  messages: MessageEntity[];
};
