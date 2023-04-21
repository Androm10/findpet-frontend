import { useCreateUserMutation } from '@shared/store/api/user.api';
import Button from '@ui/button';
import Input from '@ui/input';
import { FC, useState } from 'react';

const Page2: FC = () => {
  const [formValue, setFormValue] = useState<{ username: string; login: string; password: string }>({});
  const [createUser, result] = useCreateUserMutation();

  const clickHandler = () => {
    createUser(formValue);
  };

  return (
    <div data-cy="page-2">
      <h1>Page 2</h1>
      <div>
        <Input placeholder="Username" onChange={(e) => setFormValue({ ...formValue, username: e.target.value })} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Input placeholder="Login" onChange={(e) => setFormValue({ ...formValue, login: e.target.value })} />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Input
          placeholder="Password"
          type="password"
          onChange={(e) => setFormValue({ ...formValue, password: e.target.value })}
        />
      </div>
      <Button style={{ marginTop: '10px' }} as="button" size="medium" onClick={clickHandler}>
        Create User
      </Button>
    </div>
  );
};
Page2.displayName = 'Page2';

export default Page2;
