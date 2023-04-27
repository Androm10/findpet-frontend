import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routes } from '@shared/constants/routes';
import { devIcon, homeIcon, whiteMoonIcon } from '@shared/font-awesome-icons';
import { classNames } from '@shared/utils/class-names';
import Button from '@ui/button';
import { FC, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import s from './footer.module.scss';

export const LayoutFooter: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={s.footer}>
      <div
        className={[
          s['button-container'],
          classNames({
            [s['button-container_active']]: location.pathname === '/',
          }),
        ].join(' ')}
      >
        <Button
          as="button"
          size="medium"
          style={{ background: 'transparent' }}
          round
          onClick={() => navigate(routes.home)}
          data-cy="to-page-1-button"
        >
          <FontAwesomeIcon size="lg" icon={homeIcon} />
        </Button>
        <label>home</label>
      </div>
      <div
        className={[
          s['button-container'],
          classNames({
            [s['button-container_active']]: location.pathname === '/dev',
          }),
        ].join(' ')}
      >
        <Button
          as="button"
          size="medium"
          style={{ background: 'transparent' }}
          round
          onClick={() => navigate(routes.dev)}
          data-cy="to-dev-button"
        >
          <FontAwesomeIcon size="lg" icon={devIcon} />
        </Button>
        <label>dev</label>
      </div>
    </div>
  );
};

LayoutFooter.displayName = 'LayoutFooter';
export default memo(LayoutFooter);
