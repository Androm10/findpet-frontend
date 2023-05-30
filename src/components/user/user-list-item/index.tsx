import { userSlice } from '@shared/store/slices/user.slice';
import Avatar from '@ui/avatar';
import { UserEntity } from 'core/entities/user.entity';
import { FC, ReactNode } from 'react';
import s from './user-list-item.module.scss';

interface UserListItemProps {
  user: UserEntity;
  children?: ReactNode;
}

const UserListItem: FC<UserListItemProps> = (props: UserListItemProps) => {
  const { user, children } = props;

  return (
    <div className={s['user-list-item']}>
      <div className={s['user-list-item__avatar']}>
        <Avatar url={user.avatar?.url} label={user.username[0]} />
      </div>
      <div className={s['user-list-item__username']}>{user.username}</div>
      <div>{children}</div>
    </div>
  );
};

UserListItem.displayName = 'UserListItem';

export default UserListItem;
