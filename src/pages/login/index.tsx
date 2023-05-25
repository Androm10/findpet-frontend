import { FC } from 'react';
import s from './login.module.scss';
import LoginForm from 'components/auth/login-form';
import loginBackground from 'assets/images/login-background.jpg';
import { useAppTheme } from '@shared/hooks/use-theme';
import logoImage from 'assets/images/logo.png';

const LoginPage: FC = () => {
  useAppTheme();

  return (
    <>
      <div className={s['login-page']}>
        <div className={s['login-page__form']}>
          <div className={s['login-page__header']}>
            <div className={s['login-page__logo']}>
              <img src={logoImage} />
            </div>
            <h2>Login</h2>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className={s['login-page__background']}>
        <img src={loginBackground} />
      </div>
    </>
  );
};

LoginPage.displayName = 'LoginPage';

export default LoginPage;
