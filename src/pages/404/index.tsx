import { FC } from 'react';
import s from './error404.module.scss';
import backgroundImage from 'assets/images/404-background.jpg';

const Error404Page: FC = () => {
  return (
    <div className={s['error-page']}>
      <div className={s['error-page__gradient']} />
      <div className={s['error-page__message']}>
        <h1>404</h1>
        <label>Not found</label>
      </div>
      <div className={s['error-page__background']}>
        <img src={backgroundImage} />
      </div>
    </div>
  );
};

Error404Page.displayName = 'Error404Page';

export default Error404Page;
