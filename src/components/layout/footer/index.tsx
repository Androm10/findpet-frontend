import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routes } from '@shared/constants/routes';
import { acornIcon, alienIcon, messageIcon } from '@shared/font-awesome-icons';
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
        <Button as="button" disabled={location.pathname === '/page1'} round onClick={() => navigate(routes.page1)}>
          <FontAwesomeIcon icon={acornIcon} />
        </Button>
      </div>
      <div>
        <Button as="button" disabled={location.pathname === '/page2'} round onClick={() => navigate(routes.page2)}>
          <FontAwesomeIcon icon={alienIcon} />
        </Button>
      </div>
      <div>
        <Button as="button" disabled={location.pathname === '/page3'} round onClick={() => navigate(routes.page3)}>
          <FontAwesomeIcon icon={messageIcon} />
        </Button>
      </div>
    </div>
  );
};

LayoutFooter.displayName = 'LayoutFooter';
export default memo(LayoutFooter);
