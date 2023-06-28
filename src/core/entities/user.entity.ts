import { Photo } from 'core/types/photo.type';

export type UserEntity = {
  id: number;
  login: string;
  shelterId?: number;
  username: string;
  password: string;
  avatar?: Photo;
  isOnline: boolean;
  lastOnlineDate: Date;
};
