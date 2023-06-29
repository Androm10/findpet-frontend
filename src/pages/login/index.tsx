import { FC, useEffect } from 'react';
import s from './login.module.scss';
import LoginForm from 'components/auth/login-form';
import loginBackground from 'assets/images/login-background.jpg';
import { useAppTheme } from '@shared/hooks/use-theme';
import logoImage from 'assets/images/logo.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { JwtService } from '@shared/services/jwt.service';
import { routes } from '@shared/constants/routes';
import { useAppDispatch } from '@shared/hooks/app-dispatch.hook';
import { userActions } from '@shared/store/slices/user.slice';
import { useLazyGetMeQuery } from '@shared/store/api/user.api';

const LoginPage: FC = () => {
  useAppTheme();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = params.get('auth');
  const refresh = params.get('refresh');
  const [getMe, { data }] = useLazyGetMeQuery();

  useEffect(() => {
    if (token && refresh) {
      JwtService.setAccessToken(token);
      JwtService.setRefreshToken(refresh);
      dispatch(userActions.setAuth(true));
      getMe();
      navigate(routes.home);
    }
  }, [token, refresh]);

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
