import { useGetUsersQuery } from '@shared/store/api/user.api';
import { FC } from 'react';

const Page1: FC = () => {
  const { data } = useGetUsersQuery(undefined);

  return (
    <div data-cy="page-1">
      <h1> Page 1</h1>
      {data &&
        data.map((u) => (
          <div>
            <div>
              <label>{u.id}</label>
            </div>
            <div>
              <label>{u.login}</label>
            </div>
            <div>
              <label>{u.username}</label>
            </div>
          </div>
        ))}
    </div>
  );
};
Page1.displayName = 'Page1';

export default Page1;
