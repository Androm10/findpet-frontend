import { routes } from '@shared/constants/routes';
import { useLoginMutation, useSignupMutation } from '@shared/store/api/auth.api';
import Button from '@ui/button';
import Input from '@ui/input';
import Spinner from '@ui/spinner';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './signup-form.module.scss';

const SignupForm: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const [signupHandler, { isLoading, isSuccess, error, isError, data }] = useSignupMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log('success', data);
      navigate(routes.home);
    }

    if (isError) {
      console.log('errror', error);
    }
  }, [isLoading]);

  return (
    <div className={s['signup-form']}>
      <div className={s['signup-form__field']}>
        <label>Email</label>
        <Input value={login} onChange={(e) => setLogin(e.target.value)} className={s['signup-form__input']} />
      </div>
      <div className={s['signup-form__field']}>
        <label>Password</label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className={s['signup-form__input']}
        />
      </div>
      <div className={s['signup-form__field']}>
        <label>Confirm password</label>
        <Input
          value={password}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          className={s['signup-form__input']}
        />
      </div>
      <div className={s['signup-form__field']}>
        <label>Username</label>
        <Input value={password} onChange={(e) => setUsername(e.target.value)} className={s['signup-form__input']} />
      </div>
      <div className={s['signup-form__errors']}>{isError && <div>{(error as any).data.message}</div>}</div>

      <Button
        onClick={() => signupHandler({ login, password, confirmPassword, username })}
        size="medium"
        as="button"
        disabled={isLoading}
        className={s['signup-form__signup']}
      >
        {isLoading ? <Spinner /> : 'Sign Up'}
      </Button>
    </div>
  );
};

SignupForm.displayName = 'SignupForm';

export default SignupForm;
