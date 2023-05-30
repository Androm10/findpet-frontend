import { userSlice } from '@shared/store/slices/user.slice';
import { UserEntity } from 'core/entities/user.entity';
import { FC } from 'react';
import s from './user-list.module.scss';
import UserListItem from '../user-list-item';

interface UserListProps {
  users: UserEntity[];
}

const UserList: FC<UserListProps> = (props: UserListProps) => {
  const { users } = props;

  return (
    <div className={s['user-list']}>
      {users.map((u) => (
        <div className={s['user-list__item']} key={u.id}>
          <UserListItem user={u} />
        </div>
      ))}
    </div>
  );
};

UserList.displayName = 'UserList';

export default UserList;
