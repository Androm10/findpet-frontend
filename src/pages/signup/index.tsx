import { FC } from 'react';
import s from './signup.module.scss';
import loginBackground from 'assets/images/login-background.jpg';
import { useAppTheme } from '@shared/hooks/use-theme';
import logoImage from 'assets/images/logo.png';
import SignupForm from 'components/auth/signup-form';

const SignupPage: FC = () => {
  useAppTheme();

  return (
    <>
      <div className={s['signup-page']}>
        <div className={s['signup-page__form']}>
          <div className={s['signup-page__header']}>
            <div className={s['signup-page__logo']}>
              <img src={logoImage} />
            </div>
            <h2>Sign Up</h2>
          </div>
          <SignupForm />
        </div>
      </div>
      <div className={s['signup-page__background']}>
        <img src={loginBackground} />
      </div>
    </>
  );
};

SignupPage.displayName = 'SignupPage';

export default SignupPage;
