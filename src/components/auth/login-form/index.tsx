import { routes } from '@shared/constants/routes';
import { useLoginMutation } from '@shared/store/api/auth.api';
import Button from '@ui/button';
import Input from '@ui/input';
import Spinner from '@ui/spinner';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import s from './login-form.module.scss';

const LoginForm: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [loginHandler, { isLoading, isSuccess, error, isError, data }] = useLoginMutation();

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
    <div className={s['login-form']}>
      <div className={s['login-form__field']}>
        <label>Email</label>
        <Input value={login} onChange={(e) => setLogin(e.target.value)} className={s['login-form__input']} />
      </div>
      <div className={s['login-form__field']}>
        <label>Password</label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className={s['login-form__input']}
        />
      </div>
      <div className={s['login-form__errors']}>{isError && <div>{(error as any).data.message}</div>}</div>

      <Button
        onClick={() => loginHandler({ login, password })}
        size="medium"
        as="button"
        disabled={isLoading}
        className={s['login-form__login']}
      >
        {isLoading ? <Spinner /> : 'Login'}
      </Button>
      <div className={s['login-form__hint']}>
        Don't have an account? <Link to={routes.signup}>Sign up</Link>.
      </div>
    </div>
  );
};

LoginForm.displayName = 'LoginForm';

export default LoginForm;
