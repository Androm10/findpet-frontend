import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routes } from '@shared/constants/routes';
import { acornIcon, alienIcon, messageIcon, whiteMoonIcon } from '@shared/font-awesome-icons';
import Button from '@ui/button';
import { FC, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import s from './footer.module.scss';

export const LayoutFooter: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={s.footer}>
      <div>
        <Button
          as="button"
          size="medium"
          disabled={location.pathname === '/page1'}
          round
          onClick={() => navigate(routes.page1)}
          data-cy="to-page-1-button"
        >
          <FontAwesomeIcon size="lg" icon={acornIcon} />
        </Button>
      </div>
      <div>
        <Button
          as="button"
          size="medium"
          disabled={location.pathname === '/page2'}
          round
          onClick={() => navigate(routes.page2)}
          data-cy="to-page-2-button"
        >
          <FontAwesomeIcon size="lg" icon={alienIcon} />
        </Button>
      </div>
      <div>
        <Button
          as="button"
          size="medium"
          disabled={location.pathname === '/page3'}
          round
          onClick={() => navigate(routes.page3)}
          data-cy="to-page-3-button"
        >
          <FontAwesomeIcon size="lg" icon={messageIcon} />
        </Button>
      </div>
      <div>
        <Button
          as="button"
          size="medium"
          disabled={location.pathname === '/dev'}
          round
          onClick={() => navigate(routes.dev)}
          data-cy="to-dev-button"
        >
          <FontAwesomeIcon size="lg" icon={whiteMoonIcon} />
        </Button>
      </div>
    </div>
  );
};

LayoutFooter.displayName = 'LayoutFooter';
export default memo(LayoutFooter);
